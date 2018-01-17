<?php

namespace App\Http\Controllers;

use App\Answer;
use App\ClassSurvey;
use App\Course;
use App\Gen;
use App\Lesson;
use App\Question;
use App\StudyClass;
use App\Survey;
use App\SurveyUser;
use App\Tab;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class SurveyController extends Controller
{
    private $user;
    private $data;

    private $s3_url = "https://s3-ap-southeast-1.amazonaws.com/cmstorage";

    public function __construct()
    {
        $this->middleware('auth');
        $this->user = Auth::user();
        $this->data['tabs'] = Tab::orderBy('order')->get();
        $this->data['current_tab'] = 20;
    }

    public function index($survey_id = null)
    {
        $this->data['surveys'] = Survey::orderBy('created_at', 'desc')->paginate(15);

        $gens = Gen::all();
        $this->data['gens'] = $gens;
        $this->data['courses'] = Course::all();
        $this->data['current_gen'] = Gen::getCurrentGen();
        return view('manage.survey', $this->data);
    }

    public function attach_mail_goodbye($survey_id)
    {
        $survey = Survey::find($survey_id);
        $survey->is_final = ($survey->is_final == 0) ? 1 : 0;
        $survey->save();
        return $survey->is_final;
    }

    public function store_survey(Request $request)
    {
        $name = $request->survey_name;
        $survey = new Survey;
        $survey->name = $name;
        $survey->user_id = $this->user->id;
        $survey->save();

        return redirect('manage/survey');
    }

    public function detail($survey_id)
    {

        $survey = Survey::find($survey_id);


        $this->data['survey'] = $survey;

        return view('manage.survey_detail', $this->data);
    }

    public function store_question(Request $request)
    {
        $question = new Question;
        $question->content = $request->question_content;
        $question->type = $request->type;
        $question->survey_id = $request->survey_id;
        $question->order = $request->order;
        $question->save();
        return redirect('manage/survey/' . $question->survey_id);
    }

    public function store_answer(Request $request)
    {
        $answer = new Answer;
        $answer->content = $request->answer_content;
        $answer->question_id = $request->question_id;
        $answer->user_id = $this->user->id;
        $answer->save();
        return $answer->id;
    }

    public function survey_preview(Request $request)
    {
        $survey_id = $request->survey_id;
        $survey = Survey::find($survey_id);

        $this->data['survey'] = $survey;
        return view('survey.preview', $this->data);
    }

    public function remove_survey_lesson(Request $request)
    {
        $survey_id = $request->survey_id;
        $lesson_id = $request->lesson_id;
        $survey = Survey::find($survey_id);
        $survey->lessons()->detach($lesson_id);
        return response()->json(['message' => 'Đã xoá', 'status' => 1]);
    }

    public function create_survey_lesson(Request $request)
    {
        $survey_id = $request->survey_id;
        $lesson_id = $request->lesson_id;
        $start_time_display = $request->start_time_display;
        $time_display = $request->time_display;
        $survey = Survey::find($survey_id);
        $lesson = Lesson::find($lesson_id);
        $exist_lesson = $survey->lessons()->where('id', $lesson_id)->first();
        if ($exist_lesson == null) {
            $survey->lessons()->attach($lesson_id, [
                'time_display' => $time_display,
                'start_time_display' => $start_time_display
            ]);
            $data = [
                'message' => 'Đã thêm',
                'status' => 1,
                'lesson' => [
                    'course' => $lesson->course->name,
                    'name' => $lesson->name,
                    'order' => $lesson->order
                ]
            ];
            return response()->json($data);
        } else {
            return response()->json(['message' => 'Buổi này đã được thêm vào survey', 'status' => 0]);
        }
    }

    public function store_survey_answer(Request $request)
    {
        $survey_id = $request->survey_id;
        $gen_id = $request->gen_id;
        $survey_user_id = $request->survey_user_id;

        $survey = Survey::find($survey_id);
        $gen = Gen::find($gen_id);
        $survey_user = SurveyUser::find($survey_user_id);


        $data = array(
            $this->user->name,
            $this->user->email,
            $this->user->phone
        );

        foreach ($survey->questions as $question) {
            $field = 'question' . $question->id;
            if (is_array($request->$field)) {
                $data[] = implode(',', $request->$field);
            } else {
                $data[] = $request->$field;
            }

        }
        //        $questions = $survey->questions;
        //        $filename = $gen->name . '_' . $survey->name;
        //        if (!File::exists(storage_path('surveys/' . $filename . '.xls'))) {
        //            Excel::create($filename, function ($excel) use ($survey, $request, $data) {
        //                $excel->sheet($survey->name, function ($sheet) use ($request, $data, $survey) {
        //                    $header = array(
        //                        'Họ tên',
        //                        'email',
        //                        'Số điện thoại'
        //                    );
        //                    foreach ($survey->questions as $question) {
        //                        $header[] = $question->content;
        //                    }
        //                    $sheet->prependRow($data);
        //                    $sheet->prependRow($header);
        //                });
        //
        //            })->store('xls', storage_path('surveys'));
        //        } else {
        //            $path = 'storage/surveys/';
        //            Excel::load($path . $filename . '.xls', function ($excel) use ($survey, $request, $data) {
        //
        //                $excel->sheet($survey->name, function ($sheet) use ($request, $data) {
        //                    $sheet->prependRow(2, $data);
        //                });
        //            })->store('xls', storage_path('surveys'));
        //        }
        $survey_user->status = 1;
        $survey_user->content = json_encode($data);
        $survey_user->save();
        return redirect('profile/' . get_first_part_of_email($this->user->email));
    }

    public function download_survey(Request $request)
    {
        $surveys = Survey::all()->sortByDesc('created_at');
        $gens = Gen::orderBy('start_time', 'desc')->take(8)->get();

        $this->data['surveys'] = $surveys;
        $this->data['gens'] = $gens;

        return view('manage.download_survey', $this->data);
    }

    public function download_survey_class(Request $request)
    {
        $survey_id = $request->survey_id;
        $class_id = $request->class_id;

        $survey = Survey::find($survey_id);
        $class = StudyClass::find($class_id);

        $user_ids = $class->registers->pluck('user_id')->toArray();
        $survey_users = $survey->survey_users()->whereIn('user_id', $user_ids)->get();

        $header = array(
            'Biết đến colorME qua',
            'facebook',
            'Giới tính',
            'Ngày sinh',
            'Trường học',
            'Nơi làm việc',
            'Địa chỉ',
            'Họ tên',
            'email',
            'Số điện thoại',
        );
        foreach ($survey->questions()->orderBy('order')->get() as $question) {
            $header[] = $question->content;
        }
        $result_arr = array($header);

        foreach ($survey_users as $survey_user) {
            if ($survey_user->content != null) {
                $row = (array)json_decode($survey_user->content);
                ksort($row);
                $user = $survey_user->user;
                array_unshift($row,
                    how_know($user->how_know),
                    $user->facebook,
                    gender($user->gender),
                    format_date($user->dob),
                    $user->university,
                    $user->work,
                    $user->address,
                    $user->name,
                    $user->email,
                    $user->phone
                );
                $result_arr[] = $row;
            }
        }

        $name = $survey->name . ' Lớp ' . $class->name;
        Excel::create($name, function ($excel) use ($name, $result_arr, $header) {
            $excel->sheet('survey', function ($sheet) use ($result_arr, $header) {
                $sheet->fromArray($result_arr);
            });
        })->export('xls');
    }

    public function download_survey_file(Request $request)
    {
        $survey_id = $request->survey_id;
        $gen_id = $request->gen_id;

        $survey = Survey::find($survey_id);
        $gen = Gen::find($gen_id);

        $survey_users = $gen->survey_users()->where('survey_id', '=', $survey->id)->get();


        $header = array(
            'Biết đến colorME qua',
            'facebook',
            'Giới tính',
            'Ngày sinh',
            'Trường học',
            'Nơi làm việc',
            'Địa chỉ',
            'Họ tên',
            'email',
            'Số điện thoại',
        );
        foreach ($survey->questions()->orderBy('order')->get() as $question) {
            $header[] = $question->content;
        }

        $result_arr = array($header);

        foreach ($survey_users as $survey_user) {
            if ($survey_user->content != null) {
                $row = (array)json_decode($survey_user->content);
//                dd($row);
                ksort($row);
                $new_row = [];
                foreach ($row as $key => $value) {
                    $new_row[$key] = ltrim($value, '=');
                }
                $user = $survey_user->user;
                array_unshift($new_row,
                    how_know($user->how_know),
                    $user->facebook,
                    gender($user->gender),
                    format_date($user->dob),
                    $user->university,
                    $user->work,
                    $user->address,
                    $user->name,
                    $user->email,
                    $user->phone
                );
                $result_arr[] = $new_row;
            }
        }

//        dd($result_arr);
        $name = $survey->name . ' khoá ' . $gen->name;
        Excel::create($name, function ($excel) use ($name, $result_arr, $header) {
            $excel->sheet('survey', function ($sheet) use ($result_arr, $header) {
                $sheet->fromArray($result_arr);
            });
        })->export('xls');
//        $headers = array(
//            'Content-Encoding' => 'UTF-8',
//            'Content-type' => 'text/csv; charset=UTF-8',
//            "Content-Disposition" => "attachment; filename=" . $name . ".csv",
//            "Pragma" => "no-cache",
//            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
//            "Expires" => "0"
//        );
//
//
//        $callback = function () use ($result_arr) {
//            $file = fopen('php://output', 'w');
////            fputcsv($file, $columns);
//
//            foreach ($result_arr as $row) {
//                fputcsv($file, $row);
//            }
//            fclose($file);
//        };
//        return response()->stream($callback, 200, $headers);
    }

    public function classes(Request $request = null)
    {
        $gen = Gen::find($request->gen_id);
        $this->data['survey'] = Survey::find($request->survey_id);
        $this->data['gen'] = $gen;
        $this->data['gens'] = Gen::all();
        return view('manage.classes_survey', $this->data);

    }


    public function send_rating(Request $request = null)
    {
        $gen = Gen::find($request->gen_id);
        $this->data['gen'] = $gen;
        $this->data['gens'] = Gen::all();
        return view('manage.send_rating', $this->data);

    }

    public function ajax_send_survey(Request $request)
    {
        $classSurvey = new ClassSurvey;
        $classSurvey->class_id = $request->class_id;
        $classSurvey->survey_id = $request->survey_id;
        $classSurvey->send_status = 1;

        $class = StudyClass::find($request->class_id);
        $gen = $class->gen;
        foreach ($class->registers()->where("status", 1)->get() as $register) {
            $student = $register->user;
            $surveyUser = SurveyUser::where('gen_id', $gen->id)->where('survey_id', $request->survey_id)->where('user_id', $student->id)->first();
            if ($surveyUser == null) {
                $surveyUser = new SurveyUser;
                $surveyUser->survey_id = $request->survey_id;
                $surveyUser->user_id = $student->id;
                $surveyUser->gen_id = $gen->id;
                $surveyUser->save();
//                send_mail_goodbye($register, ['colorme.idea@gmail.com']);
            }
        }
        $classSurvey->save();

        return '  <i class=" teal-text material-icons">done</i>';
    }

    public function ajax_send_rating(Request $request)
    {
        $class = StudyClass::find($request->class_id);
        $class->rating_sended = 1;
        $class->save();
        foreach ($class->registers as $register) {
            $register->rated = 2;
            $register->save();
        }
        return '  <i class=" teal-text material-icons">done</i>';
    }

    public function delete_question(Request $request)
    {
        $question_id = $request->question_id;
        Question::find($question_id)->delete();
        return response()->json(['message' => 'deleted']);

    }

    public function test()
    {
        $path = 'storage/surveys';
        Excel::load($path . '/Filename.xls', function ($excel) {

            $excel->sheet('test', function ($sheet) {

                $sheet->prependRow(array(
                    'Teest Data', 'Test Data'
                ));
            });


        })->store('xls', storage_path('surveys'));

        //        dd(File::exists(storage_path('surveys/Filename.xls')));
    }


}
