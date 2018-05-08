<?php

use App\Register;
use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;
use \Illuminate\Support\Facades\Storage as Storage;
use \RobbieP\CloudConvertLaravel\Facades\CloudConvert as CloudConvert;
use Jenssegers\Agent\Agent as Agent;
use \Aws\ElasticTranscoder\ElasticTranscoderClient as ElasticTranscoderClient;
use Illuminate\Support\Facades\Redis;

function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function generate_protocol_url($url)
{
    if ($url) {
        return config('app.protocol') . trim_url($url);
    } else {
        return "http://d1j8r0kxyu9tj8.cloudfront.net/user.png";
    }
}

function format_date_full_option($time)
{
    return rebuild_date("j F, Y, H:i", strtotime($time));
}

function format_full_time_date($time)
{
    return rebuild_date("H:i, j F, Y", strtotime($time));
}

function format_date($time)
{
    return rebuild_date('d F, Y', strtotime($time));
}

function format_time($time)
{
    return rebuild_date('g:i a', $time);
}

function format_time_only_mysql($time)
{
    return rebuild_date('H:i:s', $time);
}

function format_time_shift($time)
{
    return rebuild_date('H:i', $time);
}

function time_elapsed_string($ptime)
{
    $etime = time() - $ptime;
    if ($etime > 24 * 60 * 60) {
        return date("j/n/Y", $ptime);
    } else {
        if ($etime < 1) {
            return 'Vừa xong';
        }

        $a = array(365 * 24 * 60 * 60 => 'năm',
            30 * 24 * 60 * 60 => 'tháng',
            24 * 60 * 60 => 'ngày',
            60 * 60 => 'giờ',
            60 => 'phút',
            1 => 'giây'
        );

        //đổi sang số nhiều
        $a_plural = array('năm' => 'năm',
            'tháng' => 'tháng',
            'ngày' => 'ngày',
            'giờ' => 'giờ',
            'phút' => 'phút',
            'giây' => 'giây'
        );

        foreach ($a as $secs => $str) {
            $d = $etime / $secs;
            if ($d >= 1) {
                $r = round($d);
                return $r . ' ' . ($r > 1 ? $a_plural[$str] : $str) . ' trước';
            }
        }
    }

}

function timeRange($start, $end)
{
    $dt = new DateTime($start);
    $dt->add(new DateInterval('PT200M'));
    $interval = $dt->diff(new DateTime($end));
    return $interval->format('%Hh %Im %Ss');
}

function computeTimeInterval($start, $end)
{
//    $dt = new DateTime($start);
//    $dt->add(new DateInterval('PT200M'));
//    $interval = $dt->diff(new DateTime($end));
//    return $interval;
    $t1 = strtotime($start);
    $t2 = strtotime($end);
    $diff = $t2 - $t1;
    $hours = $diff / (60 * 60);
    return $hours;
}


function time_remain_string($ptime)
{
    $etime = $ptime - time();
    if ($etime < 1) {
        return "Hết giờ";
    } else {
        $a = array(365 * 24 * 60 * 60 => 'năm',
            30 * 24 * 60 * 60 => 'tháng',
            24 * 60 * 60 => 'ngày',
            60 * 60 => 'giờ',
            60 => 'phút',
            1 => 'giây'
        );


        foreach ($a as $secs => $str) {
            $d = $etime / $secs;
            if ($d >= 1) {
                $r = floor($d);
                return 'Còn ' . $r . ' ' . $str;
            }
        }
        return $str;
    }

}

function compute_sale_bonus($total)
{
    $A = 0;
    $B = 0;
    $C = 0;
    if ($total > 50) {
        $A = 50;
        if ($total <= 70) {
            $B = $total - 50;
        } else {
            $B = 20;
            $C = $total - 70;
        }
    } else {
        $A = $total;
    }

    $bonus = $B * 20000 + $C * 50000;
    return $bonus;
}

function compute_sale_bonus_array($total)
{
    $A = 0;
    $B = 0;
    $C = 0;
    if ($total > 50) {
        $A = 50;
        if ($total <= 70) {
            $B = $total - 50;
        } else {
            $B = 20;
            $C = $total - 70;
        }
    } else {
        $A = $total;
    }

    $bonus = $B * 20000 + $C * 50000;
    return [$bonus, $B, $C];
}

function format_date_eng($time)
{
    return date('d F, Y', strtotime($time));
}

function is_mobile()
{
    $agent = new Agent();
    return $agent->isMobile();
}

function format_time_to_mysql($time)
{
    return rebuild_date('Y-m-d H:i:s', $time);
}

function format_vn_short_datetime($time)
{
    return rebuild_date('H:i d-m-Y', $time);
}

function format_vn_datetime($time)
{
    return rebuild_date('H:i:s d-m-Y', $time);
}

function format_vn_date($time)
{
    return rebuild_date('d/m/Y', $time);
}

//addTimeToDate($register->created_at,"+24 hours");
function addTimeToDate($date_str, $hour)
{
    $date = new DateTime($date_str);
    $date->modify($hour);
    return $date->format("Y-m-d H:i:s");
}

function date_shift($time)
{
    return rebuild_date('l - d/m/Y', $time);
}

function format_date_to_mysql($time)
{
    return rebuild_date('Y-m-d', strtotime($time));
}

function set_class_lesson_time($class)
{
    $start_date = new DateTime(date('Y-m-d', strtotime($class->datestart)));
    $start_date->modify('yesterday');

    $schedule = $class->schedule;
    $studySessions = $schedule->studySessions;

    $classLessons = $class->classLessons()
        ->join('lessons', 'class_lesson.lesson_id', '=', 'lessons.id')
        ->orderBy('lessons.order')->select('class_lesson.*')->get();


    $duration = $class->course->duration;
    $week = ceil($duration / count($studySessions));
    $count = 0;

    for ($i = 0; $i < $week; $i++) {
        foreach ($studySessions as $studySession) {
            $weekday = weekdayViToEn($studySession->weekday);

            $start_date->modify('next ' . $weekday);
            $classLessons[$count]->time = $start_date->format('Y-m-d');

            $classLessons[$count]->save();

            $count++;
            if ($count == $duration) {
                break;
            }
        }
    }
}

function generate_class_lesson($class)
{
    $course = $class->course;
    $class_lessons = $class->lessons;
    $course_lessons = $course->lessons;

    foreach ($course_lessons as $lesson) {
        if (!($class->lessons->contains($lesson))) {
            DB::table('class_lesson')->insert([
                ['class_id' => $class->id, 'lesson_id' => $lesson->id]
            ]);
            $class_lessons->push($lesson);
        }
    }
    foreach ($class_lessons as $lesson) {
        if (!($course_lessons->contains($lesson))) {
            DB::table('class_lesson')->where('lesson_id', '=', $lesson->id)->where('class_id', $class->id)->delete();
        }
    }
}


function currency_vnd_format($number)
{
    return number_format($number) . "đ";
}


function encodeUtf8($text)
{
    $regex = <<<'END'
/
  (
    (?: [\x00-\x7F]                 # single-byte sequences   0xxxxxxx
    |   [\xC0-\xDF][\x80-\xBF]      # double-byte sequences   110xxxxx 10xxxxxx
    |   [\xE0-\xEF][\x80-\xBF]{2}   # triple-byte sequences   1110xxxx 10xxxxxx * 2
    |   [\xF0-\xF7][\x80-\xBF]{3}   # quadruple-byte sequence 11110xxx 10xxxxxx * 3 
    ){1,100}                        # ...one or more times
  )
| .                                 # anything else
/x
END;
    preg_replace($regex, '$1', $text);
    return $text;
}

function get_first_part_of_email($string)
{
    $pos = strpos($string, '@');
    return substr($string, 0, $pos);
}

function get_blog_post_id($text)
{
    $id = end(explode("-", $text));
    echo $id;
}

function refine_url($url)
{
    $url = preg_replace('~[^\\pL0-9_]+~u', '-', $url);
    $url = trim($url, "-");
    $url = iconv("utf-8", "us-ascii//TRANSLIT", $url);
    $url = strtolower($url);
    $url = preg_replace('~[^-a-z0-9_]+~', '', $url);
    return $url;
}

function extract_class_name($name)
{
    $newName = convert_vi_to_en($name);
    return str_replace("-", "", $newName);
}

function convert_vi_to_en_not_url($str)
{
    // In thường
    $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
    $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
    $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
    $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
    $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
    $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
    $str = preg_replace("/(đ)/", 'd', $str);
    // In đậm
    $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
    $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
    $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
    $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
    $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
    $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
    $str = preg_replace("/(Đ)/", 'D', $str);
//    $str = str_replace(" ", "-", str_replace("&*#39;", "", $str));
    return $str;
}

function convert_vi_to_en($str)
{
    // In thường
    $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
    $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
    $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
    $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
    $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
    $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
    $str = preg_replace("/(đ)/", 'd', $str);
    // In đậm
    $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
    $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
    $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
    $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
    $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
    $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
    $str = preg_replace("/(Đ)/", 'D', $str);
    $str = str_replace(" ", "-", str_replace("&*#39;", "", $str));
    return refine_url($str);
}

function rebuild_date($format, $time = 0)
{
    if (!$time) $time = time();
    $lang = array();
    $lang['sun'] = 'CN';
    $lang['mon'] = 'T2';
    $lang['tue'] = 'T3';
    $lang['wed'] = 'T4';
    $lang['thu'] = 'T5';
    $lang['fri'] = 'T6';
    $lang['sat'] = 'T7';
    $lang['sunday'] = 'Chủ nhật';
    $lang['monday'] = 'Thứ hai';
    $lang['tuesday'] = 'Thứ ba';
    $lang['wednesday'] = 'Thứ tư';
    $lang['thursday'] = 'Thứ năm';
    $lang['friday'] = 'Thứ sáu';
    $lang['saturday'] = 'Thứ bảy';
    $lang['january'] = 'Tháng Một';
    $lang['february'] = 'Tháng Hai';
    $lang['march'] = 'Tháng Ba';
    $lang['april'] = 'Tháng Tư';
    $lang['may'] = 'Tháng Năm';
    $lang['june'] = 'Tháng Sáu';
    $lang['july'] = 'Tháng Bảy';
    $lang['august'] = 'Tháng Tám';
    $lang['september'] = 'Tháng Chín';
    $lang['october'] = 'Tháng Mười';
    $lang['november'] = 'Tháng M. một';
    $lang['december'] = 'Tháng M. hai';
    $lang['jan'] = 'T01';
    $lang['feb'] = 'T02';
    $lang['mar'] = 'T03';
    $lang['apr'] = 'T04';
    $lang['may2'] = 'T05';
    $lang['jun'] = 'T06';
    $lang['jul'] = 'T07';
    $lang['aug'] = 'T08';
    $lang['sep'] = 'T09';
    $lang['oct'] = 'T10';
    $lang['nov'] = 'T11';
    $lang['dec'] = 'T12';
    $format = str_replace("r", "D, d M Y H:i:s O", $format);
    $format = str_replace(array("D", "M"), array("[D]", "[M]"), $format);
    $return = date($format, $time);
    $replaces = array(
        '/\[Sun\](\W|$)/' => $lang['sun'] . "$1",
        '/\[Mon\](\W|$)/' => $lang['mon'] . "$1",
        '/\[Tue\](\W|$)/' => $lang['tue'] . "$1",
        '/\[Wed\](\W|$)/' => $lang['wed'] . "$1",
        '/\[Thu\](\W|$)/' => $lang['thu'] . "$1",
        '/\[Fri\](\W|$)/' => $lang['fri'] . "$1",
        '/\[Sat\](\W|$)/' => $lang['sat'] . "$1",
        '/\[Jan\](\W|$)/' => $lang['jan'] . "$1",
        '/\[Feb\](\W|$)/' => $lang['feb'] . "$1",
        '/\[Mar\](\W|$)/' => $lang['mar'] . "$1",
        '/\[Apr\](\W|$)/' => $lang['apr'] . "$1",
        '/\[May\](\W|$)/' => $lang['may2'] . "$1",
        '/\[Jun\](\W|$)/' => $lang['jun'] . "$1",
        '/\[Jul\](\W|$)/' => $lang['jul'] . "$1",
        '/\[Aug\](\W|$)/' => $lang['aug'] . "$1",
        '/\[Sep\](\W|$)/' => $lang['sep'] . "$1",
        '/\[Oct\](\W|$)/' => $lang['oct'] . "$1",
        '/\[Nov\](\W|$)/' => $lang['nov'] . "$1",
        '/\[Dec\](\W|$)/' => $lang['dec'] . "$1",
        '/Sunday(\W|$)/' => $lang['sunday'] . "$1",
        '/Monday(\W|$)/' => $lang['monday'] . "$1",
        '/Tuesday(\W|$)/' => $lang['tuesday'] . "$1",
        '/Wednesday(\W|$)/' => $lang['wednesday'] . "$1",
        '/Thursday(\W|$)/' => $lang['thursday'] . "$1",
        '/Friday(\W|$)/' => $lang['friday'] . "$1",
        '/Saturday(\W|$)/' => $lang['saturday'] . "$1",
        '/January(\W|$)/' => $lang['january'] . "$1",
        '/February(\W|$)/' => $lang['february'] . "$1",
        '/March(\W|$)/' => $lang['march'] . "$1",
        '/April(\W|$)/' => $lang['april'] . "$1",
        '/May(\W|$)/' => $lang['may'] . "$1",
        '/June(\W|$)/' => $lang['june'] . "$1",
        '/July(\W|$)/' => $lang['july'] . "$1",
        '/August(\W|$)/' => $lang['august'] . "$1",
        '/September(\W|$)/' => $lang['september'] . "$1",
        '/October(\W|$)/' => $lang['october'] . "$1",
        '/November(\W|$)/' => $lang['november'] . "$1",
        '/December(\W|$)/' => $lang['december'] . "$1");
    return preg_replace(array_keys($replaces), array_values($replaces), $return);
}

function random($length = 10, $char = FALSE)
{
    if ($char == FALSE) $s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz0123456789!@#$%^&*()';
    else $s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz0123456789';
    mt_srand((double)microtime() * 1000000);
    $salt = '';
    for ($i = 0; $i < $length; $i++) {
        $salt = $salt . substr($s, (mt_rand() % (strlen($s))), 1);
    }
    return $salt;
}

function RGBToHex($r, $g, $b)
{
    //String padding bug found and the solution put forth by Pete Williams (http://snipplr.com/users/PeteW)
    $hex = "#";
    $hex .= str_pad(dechex($r), 2, "0", STR_PAD_LEFT);
    $hex .= str_pad(dechex($g), 2, "0", STR_PAD_LEFT);
    $hex .= str_pad(dechex($b), 2, "0", STR_PAD_LEFT);

    return $hex;
}

function deleteFileFromS3($file_name)
{
    $s3 = \Illuminate\Support\Facades\Storage::disk('s3');
    $s3->delete($file_name);
}

function uploadFileToS3(\Illuminate\Http\Request $request, $fileField, $size, $oldfile = null)
{
    $image = $request->file($fileField);

    if ($image != null) {
        $mimeType = $image->guessClientExtension();
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');


        if ($mimeType != 'image/gif') {
            $imageFileName = time() . random(15, true) . '.jpg';
            $img = Image::make($image->getRealPath())->encode('jpg', 90)->interlace();
            if ($img->width() > $size) {
                $img->resize($size, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
            }
            $img->save($image->getRealPath());
        } else {
            $imageFileName = time() . random(15, true) . '.' . $image->getClientOriginalExtension();
        }
        $filePath = '/images/' . $imageFileName;
        $s3->getDriver()->put($filePath, fopen($image, 'r+'), ['ContentType' => $mimeType, 'visibility' => 'public']);
//        if ($oldfile != null) {
//            $s3->delete($oldfile);
//        }
        return $filePath;
    }
    return null;
}

function uploadImageToS3(\Illuminate\Http\Request $request, $fileField, $size, $oldfile = null)
{
    $image = $request->file($fileField);

    if ($image != null) {
        $mimeType = $image->guessClientExtension();
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');


        if ($mimeType != 'image/gif') {
            $imageFileName = time() . random(15, true) . '.jpg';
            $img = Image::make($image->getRealPath())->encode('jpg', 90)->interlace();
//            if ($img->width() > $size) {
//                $img->resize($size, null, function ($constraint) {
//                    $constraint->aspectRatio();
//                });
//            }
            $img->save($image->getRealPath());
        } else {
            $imageFileName = time() . random(15, true) . '.' . $image->getClientOriginalExtension();
        }
        $filePath = '/images/' . $imageFileName;
        $s3->getDriver()->put($filePath, fopen($image, 'r+'), ['ContentType' => $mimeType, 'visibility' => 'public']);
//        if ($oldfile != null) {
//            $s3->delete($oldfile);
//        }
        return $filePath;
    }
    return null;
}

function uploadThunbImageToS3(\Illuminate\Http\Request $request, $fileField, $size, $oldfile = null)
{
    $image = $request->file($fileField);

    if ($image != null) {
        $mimeType = $image->getMimeType();
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');


//        if ($mimeType != 'image/gif') {
        $imageFileName = time() . random(15, true) . '.jpg';
        $img = Image::make($image->getRealPath())->encode('jpg', 90)->interlace();
        if ($img->width() > $size) {
            $img->widen($size);
        }
        $img->save($image->getRealPath());
//        } else {
//            $imageFileName = time() . random(15, true) . '.' . $image->getClientOriginalExtension();
//        }
        $filePath = '/images/' . $imageFileName;
        $s3->getDriver()->put($filePath, fopen($image, 'r+'), ['ContentType' => $mimeType, 'visibility' => 'public']);
        if ($oldfile != null) {
            $s3->delete($oldfile);
        }
        return $filePath;
    }
    return null;

}

function deleteFromS3($path)
{
    $s3 = Storage::disk('s3');
    if ($path != null) {
        $s3->delete($path);
    }

}

function uploadLargeFileToS3(\Illuminate\Http\Request $request, $fileField, $oldfile = null)
{
    $file = $request->file($fileField);
    if ($file != null) {
        $mimeType = $file->guessClientExtension();
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');

        $fileName = time() . random(15, true) . '.' . $file->getClientOriginalExtension();
        $filePath = '/files/' . $fileName;
        // dd($file);
        $s3->getDriver()->put($filePath, fopen($file, 'r+'),
            ['ContentType' => $mimeType, 'visibility' => 'public']);
        if ($oldfile != null) {
            $s3->delete($oldfile);
        }
        return $filePath;
    }
    return null;

}

function uploadAndTranscodeVideoToS3(\Illuminate\Http\Request $request, $fileField, $oldfile = null)
{
    $sourceFile = $request->file($fileField);
    if ($sourceFile != null) {
        $imageFileName = time() . random(15, true) . '.' . $sourceFile->getClientOriginalExtension();


        $mimeType = $sourceFile->getMimeType();
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');
        $filePath = '/tmp/' . $imageFileName;

        $s3->getDriver()->put($filePath, fopen($sourceFile, 'r+'), ['ContentType' => $mimeType, 'visibility' => 'public']);
        if ($oldfile != null) {
            $s3->delete($oldfile);
        }
        return $filePath;
    }
    return null;

}

function create_elastic_transcoder_job($transcoder_client, $pipeline_id, $input_key, $preset_id, $output_key_prefix)
{
    # Setup the job input using the provided input key.
    $input = array('Key' => $input_key);

    # Setup the job output using the provided input key to generate an output key.
    $file_name = time() . hash("sha256", utf8_encode($input_key));
    $outputs = array(
        array(
            'Key' => $file_name . '.mp4',
            'PresetId' => $preset_id,
            "ThumbnailPattern" => $file_name . "-{count}"
        )
    );

    # Create the job.
    $create_job_request = array(
        'PipelineId' => $pipeline_id,
        'Input' => $input,
        'Outputs' => $outputs,
        'OutputKeyPrefix' => $output_key_prefix
    );
    $create_job_result = $transcoder_client->createJob($create_job_request)->toArray();
    return $job = $create_job_result["Job"];
}

function uploadLargeFileToS3Useffmpec(\Illuminate\Http\Request $request, $fileField, $oldfile = null)
{
    $sourceFile = $request->file($fileField);
    if ($sourceFile != null) {
        $random = random(15, true);
        $imageFileName = time() . $random . '.' . $sourceFile->getClientOriginalExtension();
        $videoFileName = time() . $random . '.mp4';

        $filePath = 'videos/' . $imageFileName;
        $videoPath = 'videos/' . $videoFileName;
        $s3 = \Illuminate\Support\Facades\Storage::disk('s3');


        if ($sourceFile->getClientOriginalExtension() == 'mov') {
            Storage::put($filePath, fopen($sourceFile, 'r+'));

            $storagePath = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix();
            //            dd('ffmpeg -i ' . $storagePath . $imageFileName . ' -vcodec copy -acodec copy ' . $storagePath . $videoFileName);
            exec('ffmpeg -i ' . $storagePath . $filePath . ' -vcodec libx264 -vpre medium ' . $storagePath . $videoPath);
            //            exec('ffmpeg -y -i ' . $storagePath . $filePath . ' -an -s hd720 -vcodec libx264 -b:v BITRATE  -vcodec libx264 -pix_fmt yuv420p -preset slow -profile:v baseline -movflags faststart -y ' . $storagePath . $videoPath);

            $s3->getDriver()->put($videoPath, fopen($storagePath . $videoPath, 'r+'), ['ContentType' => 'video/mp4', 'visibility' => 'public']);
            Storage::delete($videoPath);
            Storage::delete($filePath);
        } else {
            $s3->getDriver()->put($filePath, fopen($sourceFile, 'r+'), ['ContentType' => 'video/mp4', 'visibility' => 'public']);
        }


        if ($oldfile != null) {
            $s3->delete($oldfile);
        }
        //        CloudConvert::file(CloudConvert::S3($filePath))
        //            ->to(CloudConvert::FTP('img/temp.mp4'));
        return '/' . $videoPath;
    }
    return null;

}

function uploadLargeFileToS3UseCloudConvert(\Illuminate\Http\Request $request, $fileField, $oldfile = null)
{
    $sourceFile = $request->file($fileField);
    if ($sourceFile != null) {
        $random = time() . random(15, true);

        $imageFileName = $random . '.' . $sourceFile->getClientOriginalExtension();
        $videoFileName = $random . '.mp4';

        $filePath = 'videos/' . $imageFileName;
        $videoPath = 'videos/' . $videoFileName;


        $storagePath = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix();
        $s3 = Storage::disk('s3');

        if ($sourceFile->getClientOriginalExtension() == 'mov') {
            Storage::put($filePath, fopen($sourceFile, 'r+'));

            CloudConvert::file($storagePath . $filePath)->to(CloudConvert::S3($videoPath));
            //            $s3->getDriver()->put($videoPath, fopen($storagePath . $videoPath, 'r+'), ['ContentType' => 'video/mp4', 'visibility' => 'public']);
            //            Storage::delete($videoPath);
            Storage::delete($filePath);
        } else {
            $s3->getDriver()->put($filePath, fopen($sourceFile, 'r+'), ['ContentType' => 'video/mp4', 'visibility' => 'public']);
        }

        //


        //        dd($storagePath . $filePath);


        if ($oldfile != null) {
            $s3->delete($oldfile);
        }
        //        CloudConvert::file(CloudConvert::S3($filePath))
        //            ->to(CloudConvert::FTP('img/temp.mp4'));
        return '/' . $videoPath;
    }
    return null;

}

function call_status_text($num)
{
    if ($num == 1) {
        return "success";
    }
    if ($num == 2) {
        return "calling";
    }
    if ($num == 0) {
        return "failed";
    }
    if ($num == 4) {
        return "uncall";
    }
    return 'unknown status';
}

function call_status($num)
{
    if ($num == 1) {
        return "<strong class='green-text'>Thành công</strong>";
    }
    if ($num == 2) {
        return "<strong class='blue-text'>Đang gọi</strong>";
    }
    if ($num == 0) {
        return "<strong class='red-text'>Thất bại</strong>";
    }
    return 'unknown status';
}

function notification_type($type)
{
    switch ($type) {
        case 0:
            return 'like';
        case 1:
            return 'new_comment';
        case 2:
            return 'also_comment';
        case 3:
            return "money_transferring";
        case 4:
            return "money_transferred";
        case 5:
            return "new_topic";
        case 6:
            return "feature";
        default:
            return "unsupport";
    }
}

function transaction_status($status)
{
    if ($status == 0) return 'Đang chờ';
    if ($status == 1) return 'Thành công';
    if ($status == -1) return 'Thất bại';
    return 'unknown status';
}

function transaction_status_raw($status)
{
    if ($status == 0) return 'pending';
    if ($status == 1) return 'success';
    if ($status == -1) return 'failed';
    return 'unknown status';
}

function diffDate($start, $end)
{
    $workingHours = (strtotime($end) - strtotime($start)) / 3600;
    return $workingHours;
}

function createDateRangeArray($iDateFrom, $iDateTo)
{
    // takes two dates formatted as YYYY-MM-DD and creates an
    // inclusive array of the dates between the from and to dates.

    // could test validity of dates here but I'm already doing
    // that in the main script

    $aryRange = array();


    if ($iDateTo >= $iDateFrom) {
        array_push($aryRange, date('Y-m-d', $iDateFrom)); // first entry
        while ($iDateFrom < $iDateTo) {
            $iDateFrom += 86400; // add 24 hours
            array_push($aryRange, date('Y-m-d', $iDateFrom));
        }
    }
    return $aryRange;
}

//0: text
//1:radio
//2:checkbox
function question_type($type)
{
    if ($type == 0) {
        return "Text";
    } else if ($type == 1) {
        return "Radio button";
    } else if ($type == 2) {
        return "Check box";
    }
}

function question_type_key($type)
{
    if ($type == 0) {
        return "text";
    } else if ($type == 1) {
        return "radio";
    } else if ($type == 2) {
        return "checkbox";
    }
}

function question_view($type)
{
    if ($type == 0) {
        return "survey.text";
    } else if ($type == 1) {
        return "survey.radio";
    } else if ($type == 2) {
        return "survey.checkbox";
    } else if ($type == 3) {
        return "survey.rating";
    }
}

function rating_color($rating)
{
    if ($rating <= 1 && $rating > 0) {
        return '#b71c1c';
    } elseif ($rating > 1 && $rating <= 2) {
        return '#ff6f00';
    } elseif ($rating > 2 && $rating <= 3) {
        return '#f9a825';
    } elseif ($rating > 3 && $rating <= 4) {
        return '#1565c0';
    } elseif ($rating > 4 && $rating <= 5) {
        return '#558b2f';
    } else {
        return '#ABABAB';
    }
}

function how_know($val)
{
    if ($val == 1) {
        return 'Facebook';
    } elseif ($val == 6) {
        return 'Instagram';
    } elseif ($val == 2) {
        return 'Người quen';
    } elseif ($val == 3) {
        return 'Google';
    } else {
        return 'Lý do khác';
    }
}

function gender($val)
{
    if ($val == 1) {
        return 'Nam';
    } elseif ($val == 2) {
        return 'Nữ';
    } else {
        return 'Khác';
    }
}

function email_status_int_to_str($status)
{
    if ($status == 1) {
        return 'Delivery';
    } elseif ($status == 2) {
        return 'Bounce';
    } elseif ($status == 3) {
        return 'Opened';
    } elseif ($status == 4) {

        return 'Complaint';
    } else {
        return 'other';
    }
}


function email_status_str_to_int($status)
{
    if ($status == 'Delivery') {
        return 1;
    } elseif ($status == 'Bounce') {
        return 2;
    } elseif ($status == 'Opened') {
        return 3;
    } elseif ($status == 'Complaint') {
        return 4;
    } else {
        return 'other';
    }
}

function extract_email_from_str($string)
{
    $pattern = '/([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])' .
        '(([a-z0-9-])*([a-z0-9]))+' . '(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)/i';

    preg_match($pattern, $string, $matches);
    if (count($matches) > 0) {
        return $matches[0];
    } else {
        return null;
    }

}

function transaction_type($type)
{
    switch ($type) {
        case 0:
            return '<span class="blue-text">chuyển tiền</span>';
        case 1:
            return '<span class="green-text">thu</span>';
        case 2:
            return '<span class="red-text">chi</span>';
        default:
            return 'khác';
    }
}

function transaction_type_raw($type)
{
    switch ($type) {
        case 0:
            return "chuyentien";
        case 1:
            return 'thu';
        case 2:
            return 'chi';
        default:
            return 'khac';
    }
}

function seo_keywords()
{
    return "Khoá học thiết kế cơ bản, Học thiết kế đồ hoạ hà nội, học thiết kế đồ hoạ, học thiết kế đồ họa tp hcm Alibaba English.";
}


//Facebook Force Re-scrape
function re_scrape($url)
{
    $graph = 'https://graph.facebook.com/';
    $post = 'id=' . urlencode($url) . '&scrape=true';
    return send_post($graph, $post);
}

function orderToWeekday($order)
{
    switch ($order) {
        case 1:
            return "Thứ hai";
        case 2:
            return "Thứ ba";
        case 3:
            return "Thứ tư";
        case 4:
            return "Thứ năm";
        case 5:
            return "Thứ sáu";
        case 6:
            return "Thứ bảy";
        case 7:
            return "Chủ nhật";
        default:
            return "unknown";
    }
}

function format_time_main($time)
{
    return rebuild_date('d/m/Y H:i:s', strtotime($time));
}


function weekdayViToNumber($weekday)
{
    switch ($weekday) {
        case "Thứ hai":
            return 1;
        case "Thứ ba":
            return 2;
        case "Thứ tư":
            return 3;
        case "Thứ năm":
            return 4;
        case "Thứ sáu":
            return 5;
        case "Thứ bảy":
            return 6;
        case "Chủ nhật":
            return 7;
        default:
            return 1;
    }
}

function weekdayViToEn($weekday)
{
    switch ($weekday) {
        case "Thứ hai":
            return 'monday';
        case "Thứ ba":
            return 'tuesday';
        case "Thứ tư":
            return 'wednesday';
        case "Thứ năm":
            return 'thursday';
        case "Thứ sáu":
            return 'friday';
        case "Thứ bảy":
            return 'saturday';
        case "Chủ nhật":
            return 'sunday';
        default:
            return 'sunday';
    }
}

function send_post($url, $post)
{
    $r = curl_init();
    curl_setopt($r, CURLOPT_URL, $url);
    curl_setopt($r, CURLOPT_POST, 1);
    curl_setopt($r, CURLOPT_POSTFIELDS, $post);
    curl_setopt($r, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($r, CURLOPT_CONNECTTIMEOUT, 5);
    $data = curl_exec($r);
    curl_close($r);
    return $data;
}

function send_push_notification($data)
{

    $r = curl_init();
    curl_setopt($r, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: key=' . config('app.fcm_key')
    ));

    curl_setopt($r, CURLOPT_URL, "https://gcm-http.googleapis.com/gcm/send");
    curl_setopt($r, CURLOPT_POST, 1);
    curl_setopt($r, CURLOPT_POSTFIELDS, '{
          "to": "/topics/colorme",
          "data": {
            "message": ' . $data . '
           }
        }');
    curl_setopt($r, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($r, CURLOPT_CONNECTTIMEOUT, 5);
    $data = curl_exec($r);
    curl_close($r);
    return $data;
}

function getDevicesNotification($appId, $appKey)
{
    $app_id = $appId;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/players?app_id=" . $app_id . '&limit=50000');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json',
        'Authorization: Basic ' . $appKey));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response)->players;
}

function random_color_part()
{
    return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
}

function random_color()
{
    return random_color_part() . random_color_part() . random_color_part();
}

function first_part_of_code($class_name, $waitingCode, $nextCode)
{
    if (strpos($class_name, '.') !== false) {
        return config('app.prefix_code') . $nextCode;
    } else {
        return config('app.prefix_code_wait') . $waitingCode;
    }
}


function send_sms_confirm_money($register)
{

    if (empty(config('app.sms_key')) || empty(config('app.brand_sms'))) return 0;
    $client = new \GuzzleHttp\Client(['base_uri' => "http://api-02.worldsms.vn"]);
//    $promise = $client->post("/webapi/sendSMS");
    $headers = [
        "Content-Type" => "application/json",
        "Accept" => "application/json",
        "Authorization" => "Basic " . config('app.sms_key')
    ];
//    dd($headers);
    $course_name = convert_vi_to_en_not_url($register->studyClass->course->name);
    $text = strtoupper($course_name) . "\nChao " . ucwords(convert_vi_to_en_not_url($register->user->name)) . ", ban da thanh toan thanh cong " . currency_vnd_format($register->money) . ". Ma hoc vien cua ban la: " . $register->code . ". Cam on ban.";
    $phone = preg_replace('/[^0-9]+/', '', $register->user->phone);
    $body = json_encode([
        "from" => config('app.brand_sms'),
        "to" => $phone,
        "text" => convert_vi_to_en_not_url($text)
    ]);


    $request = new GuzzleHttp\Psr7\Request('POST', 'http://api-02.worldsms.vn/webapi/sendSMS', $headers, $body);
    $response = $client->send($request);
    $status = json_decode($response->getBody())->status;


    $sms = new \App\Sms();
    $sms->content = convert_vi_to_en_not_url($text);
    $sms->user_id = $register->user_id;
    $sms->purpose = "Money Confirm";
    if ($status == 1) {
        $sms->status = "success";
    } else {
        $sms->status = "failed";
    }
    $sms->save();

    $register->sms_confirm_sended = 1;
    $register->sms_confirm_id = $sms->id;
    $register->save();

    return $status;

}

function send_sms_remind($register)
{
    if (empty(config('app.sms_key')) || empty(config('app.brand_sms'))) return 0;
    $client = new \GuzzleHttp\Client(['base_uri' => "http://api-02.worldsms.vn"]);
//    $promise = $client->post("/webapi/sendSMS");
    $headers = [
        "Content-Type" => "application/json",
        "Accept" => "application/json",
        "Authorization" => "Basic " . config('app.sms_key')
    ];
    $splitted_time = explode(" ", $register->studyClass->study_time)[0];
//    dd($splitted_time);
//    dd($headers);

    $datestart = date('d/m', strtotime($register->studyClass->datestart));
//    dd($datestart);
    $course_name = convert_vi_to_en_not_url($register->studyClass->course->name);
    $text = strtoupper($course_name) . "\nChao " . ucwords(convert_vi_to_en_not_url($register->user->name)) . "\nChao " . ucwords(convert_vi_to_en_not_url($register->user->name)) . ". Khoa hoc cua ban se bat dau vao ngay mai " . $datestart . " vao luc " . $splitted_time . ". Ban nho den som 15p de cai dat phan mem nhe.";
    $phone = preg_replace('/[^0-9]+/', '', $register->user->phone);
    $body = json_encode([
        "from" => config('app.brand_sms'),
        "to" => $phone,
        "text" => convert_vi_to_en_not_url($text)
    ]);

    $request = new GuzzleHttp\Psr7\Request('POST', 'http://api-02.worldsms.vn/webapi/sendSMS', $headers, $body);
    $response = $client->send($request);
    $status = json_decode($response->getBody())->status;

    $sms = new \App\Sms();
    $sms->content = convert_vi_to_en_not_url($text);
    $sms->user_id = $register->user_id;
    $sms->purpose = "Remind Start Date";
    if ($status == 1) {
        $sms->status = "success";
    } else {
        $sms->status = "failed";
    }
    $sms->save();

    $register->sms_remind_sended = 1;
    $register->sms_remind_id = $sms->id;
    $register->save();

    return $status;

}

function send_sms_general($register, $content)
{
    if (empty(config('app.sms_key')) || empty(config('app.brand_sms'))) return 0;
    $client = new \GuzzleHttp\Client(['base_uri' => "http://api-02.worldsms.vn"]);
//    $promise = $client->post("/webapi/sendSMS");
    $headers = [
        "Content-Type" => "application/json",
        "Accept" => "application/json",
        "Authorization" => "Basic " . config('app.sms_key')
    ];


    $phone = preg_replace('/[^0-9]+/', '', $register->user->phone);

    $body = json_encode([
        "from" => config('app.brand_sms'),
        "to" => $phone,
        "text" => convert_vi_to_en_not_url($content)
    ]);

    $request = new GuzzleHttp\Psr7\Request('POST', 'http://api-02.worldsms.vn/webapi/sendSMS', $headers, $body);
    $response = $client->send($request);
    $status = json_decode($response->getBody())->status;

    $sms = new \App\Sms();
    $sms->content = convert_vi_to_en_not_url($content);
    $sms->user_id = $register->user_id;
    $sms->purpose = "Notification";
    if ($status == 1) {
        $sms->status = "success";
    } else {
        $sms->status = "failed";
    }
    $sms->save();

    $register->sms_remind_sended = 1;
    $register->sms_remind_id = $sms->id;
    $register->save();

    return $status;

}

function send_sms($user_id, $phone, $content, $purpose, $sms_template_id = null)
{
    if (empty(config('app.sms_key')) || empty(config('app.brand_sms'))) return 0;
    $client = new \GuzzleHttp\Client(['base_uri' => "http://api-02.worldsms.vn"]);
//    $promise = $client->post("/webapi/sendSMS");
    $headers = [
        "Content-Type" => "application/json",
        "Accept" => "application/json",
        "Authorization" => "Basic " . config('app.sms_key')
    ];


    $phone = preg_replace('/[^0-9]+/', '', $phone);

    $body = json_encode([
        "from" => config('app.brand_sms'),
        "to" => $phone,
        "text" => convert_vi_to_en_not_url($content)
    ]);

    $request = new GuzzleHttp\Psr7\Request('POST', 'http://api-02.worldsms.vn/webapi/sendSMS', $headers, $body);
    $response = $client->send($request);
    $status = json_decode($response->getBody())->status;

    $sms = new \App\Sms();
    $sms->content = convert_vi_to_en_not_url($content);
    $sms->user_id = $user_id;
    $sms->purpose = $purpose;
    $sms->sms_template_id = $sms_template_id ? $sms_template_id : 0;
    if ($status == 1) {
        $sms->status = "success";
    } else {
        $sms->status = "failed";
    }
    $sms->save();

    return $status;

}

function trim_url($url)
{
    if (substr($url, 0, 7) === 'http://') return substr($url, 7);
    if (substr($url, 0, 8) === 'https://') return substr($url, 8);
    return $url;
}

function convert_email_form($email_form)
{
    $data = $email_form->template->content;

    $searchReplaceArray = array(
        '[[LOGO]]' => config('app.protocol') . (!empty($email_form->logo_url) ? $email_form->logo_url : "d1j8r0kxyu9tj8.cloudfront.net/icons/no-logo.png"),
        '[[AVT]]' => config('app.protocol') . (!empty($email_form->avatar_url) ? $email_form->avatar_url : "d1j8r0kxyu9tj8.cloudfront.net/icons/no-logo.png"),
        '[[TITLE]]' => (!empty($email_form->title) ? $email_form->title : "Tiêu đề"),
        '[[SUBTITLE]]' => (!empty($email_form->subtitle) ? $email_form->subtitle : "Phụ đề"),
        '[[CONTENT]]' => (!empty($email_form->content) ? $email_form->content : "Nội dung"),
        '[[FOOTER]]' => (!empty($email_form->footer) ? $email_form->footer : "Footer"),
        '[[BUTTONTEXT]]' => (!empty($email_form->title_button) ? $email_form->title_button : "Tiêu đề"),
        '[[BUTTONLINK]]' => (!empty($email_form->link_button) ? $email_form->link_button : "Link"),
    );


    $data = str_replace(
        array_keys($searchReplaceArray),
        array_values($searchReplaceArray),
        $data);
    return $data;
}


function trim_color($color)
{
    if ($color[0] === '#') return substr($color, 1);
    return $color;
}

function is_exist_study_session($study_session)
{
    $study_sessions = \App\StudySession::all();

    foreach ($study_sessions as $s) {
        $start_time = date("G:i", strtotime($s->start_time));
        $end_time = date("G:i", strtotime($s->end_time));
        $weekday = $s->weekday;
        if ($study_session->weekday == $weekday && $start_time == $study_session->start_time
            && $end_time == $study_session->end_time
        ) {
            return true;
        }
    }
    return false;
}

function format_data_schedule_class($schedule)
{
    $sessionsStr = "";
    $study_session_ids = array();

    foreach ($schedule->studySessions as $session) {
        $sessionsStr .= $session->weekday . ": " . date("G:i", strtotime($session->start_time)) . "-" . date("G:i", strtotime($session->end_time)) . "<br/>";
        array_push($study_session_ids, $session->id);
    }

    return [
        'id' => $schedule->id,
        'name' => $schedule->name,
        'description' => $schedule->description,
        'sessions_str' => $sessionsStr,
        'study_session_ids' => $study_session_ids
    ];
}

function is_delete_register($user, $register)
{
    if ($user->role == 2 || ($register->saler && $register->saler->id == $user->id)) {
        return true;
    }

    return false;
}

function haversineGreatCircleDistance(
    $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371008)
{
    // convert from degrees to radians
    $latFrom = deg2rad($latitudeFrom);
    $lonFrom = deg2rad($longitudeFrom);
    $latTo = deg2rad($latitudeTo);
    $lonTo = deg2rad($longitudeTo);

    $latDelta = $latTo - $latFrom;
    $lonDelta = $lonTo - $lonFrom;

    $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
    return $angle * $earthRadius;
}

function is_class_lesson_change($class_lesson)
{
    $time_class_lesson = strtotime($class_lesson->time . ' ' . $class_lesson->start_time);
    $time_now = strtotime("now");
    if ($time_now < $time_class_lesson) return true;
    return false;
}

function add_browser_notification($user_id, $token_browser)
{
    $data = array(
        "user_id" => $user_id,
        'token' => $token_browser
    );

    $publish_data = array(
        "event" => "add_token_browser",
        "data" => $data
    );

    Redis::publish(config("app.channel"), json_encode($publish_data));
}

function send_notification_browser($notification, $user_id)
{

    $content = array(
        "en" => remove_tag($notification['message'])
    );

    $fields = array(
        'app_id' => "ceea18e8-322a-4748-b18b-fdf066d9a5ff",
        'filters' => array(array("field" => "tag", "key" => "user_id", "relation" => "=", "value" => $user_id)),
        'contents' => $content
    );

    $fields = json_encode($fields);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
        'Authorization: Basic OWFiNWY2YzQtY2Q1OC00ZGU4LTliZmItYjY3ZGM1MjljNTk4'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

function remove_tag($html)
{
    return preg_replace('#<[^>]+>#', '', $html);
}

function defaultAvatarUrl()
{
    return generate_protocol_url("d1j8r0kxyu9tj8.cloudfront.net/user.png");
}

function emptyImageUrl()
{
    return generate_protocol_url("d1j8r0kxyu9tj8.cloudfront.net/images/1516675031ayKt10MXsow6QAh.jpg");
}

function abbrev($s)
{
    $v = "";
    $pieces = explode(" ", $s);
    foreach ($pieces as $piece) {
        $v .= $piece[0];
    }
    return strtoupper($v);
}

function next_code()
{
    $code = Register::where('code', 'like', config('app.prefix_code') . '%')
        ->where('code', 'not like', config('app.prefix_code_wait') . '%')->orderBy('code', 'desc')->first();

    $data = [];
    if ($code) {
        $code = $code->code;
        $nextNumber = explode(config('app.prefix_code'), $code)[1];
        $nextNumber = $nextNumber != '' ? $nextNumber + 1 : config('app.prefix_code') . '1';
        $data["next_code"] = config('app.prefix_code') . $nextNumber;
    } else {
        $data["next_code"] = config('app.prefix_code') . '1';
    }

    $waiting_code = Register::where('code', 'like', config('app.prefix_code_wait') . '%')
        ->orderBy('code', 'desc')->first();
    if ($waiting_code) {
        $waiting_code = $waiting_code->code;
        $next_waiting_code = explode(config('app.prefix_code_wait'), $waiting_code)[1];
        $waiting_code = $next_waiting_code != '' ? $next_waiting_code + 1 : config('app.prefix_code_wait') . "1";
        $data["next_waiting_code"] = config('app.prefix_code_wait') . $waiting_code;
    } else {
        $data["next_waiting_code"] = config('app.prefix_code_wait') . "1";
    }
    return $data;
}

function shortString($string, $max)
{
    $arr = explode(" ", $string);
    $arr = array_slice($arr, 0, min(count($arr), $max));
    $data = implode(" ", $arr);
    if (count(explode(" ", $string)) > $max) return $data . ' ...';
    return $data;
}

function convert_image_html($string)
{
    return str_replace("<img ", '<img style="width:100%; height:auto"', $string);
}

function sound_cloud_track_id($url)
{

    $url_api = 'https://api.soundcloud.com/resolve.json';
    $params = array(
        'url' => $url,
        'client_id' => config('app.sound_cloud_client_id')
    );

    $post_field = '';
    foreach ($params as $key => $value) {
        if ($post_field != '') $post_field .= '&';
        $post_field .= $key . "=" . $value;
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url_api);
    curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');
    curl_setopt($ch, CURLOPT_VERBOSE, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_field);
    $result = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($status == 302) {
        $url = json_decode($result)->location;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($status == 200) {
            return json_decode($result)->id;
        }
    }

    return '';
}

function getCommentPostFacebook($url)
{
    $r = curl_init();

    curl_setopt($r, CURLOPT_URL, $url);
    curl_setopt($r, CURLOPT_POST, FALSE);
    curl_setopt($r, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($r);
    $httpcode = curl_getinfo($r, CURLINFO_HTTP_CODE);
    curl_close($r);
    return [
        'data' => json_decode($data),
        'status' => $httpcode == 200 ? 1 : 0
    ];
}

function getAllCommentFacebook($post_id, $token)
{
    $url = "https://graph.facebook.com/v1.0/$post_id/comments?access_token=$token&limit=10000";
    $comments = array();
    do {
        $data = getCommentPostFacebook($url);
        if ($data['status'] == 0 || count($data['data']->data) <= 0) {
            break;
        }
        foreach ($data['data']->data as $item) {
            $comments[] = $item;
        }
        if (isset($data['data']->paging->next)) {
            $url = $data['data']->paging->next;
        } else {
            break;
        }

    } while (true);

    return $comments;
}

function getEmailFromText($text)
{
    preg_match_all("/[._a-zA-Z0-9-]+@[._a-zA-Z0-9-]+/i", $text, $matches);
    return !empty($matches[0]) ? $matches[0][0] : "";
}

function convertShareToDownload($content)
{
    $str1 = "<div id=\"vue-share-to-download\">
        <a class=\"btn btn-success btn-round\"
           style=\"color:white; display: flex;align-items: center;justify-content: center;background-color:#3b5998!important; border-color:#3b5998!important\"
           onclick=\"shareOnFB()\" v-if=\"!shared\">
            <span class=\"glyphicon glyphicon-share\"
                  style=\" margin:3px 0 7px 0!important;font-family:Glyphicons Halflings!important\"></span><span
                    style=\"margin:5px 0!important;font-family:Roboto!important; \"> &nbspChia sẻ để tải ({{share_count}})<span></a>
        <a class=\"btn btn-success btn-round\" v-if=\"shared\"
           style=\"color:white; display: flex;align-items: center;justify-content: center;\" href=\"";
    $str2 = "\">


            <span class=\"glyphicon glyphicon-download\"
                  style=\" margin:3px 0 7px 0!important;font-family:Glyphicons Halflings!important\"></span><span
                    style=\"margin:5px 0!important;font-family:Roboto!important; \"> &nbspTải xuống<span></a>
    </div>";

    $data = $content;

    if ((strpos($content, '[[share_to_download]]') && strpos($content, '[[/share_to_download]]')) || (strpos($content, '[[SHARE_TO_DOWNLOAD]]') && strpos($content, '[[/SHARE_TO_DOWNLOAD]]'))) {
        $searchReplaceArray = array(
            '[[share_to_download]]' => $str1,
            '[[/share_to_download]]' => $str2,
            '[[SHARE_TO_DOWNLOAD]]' => $str1,
            '[[/SHARE_TO_DOWNLOAD]]' => $str2,
        );


        $data = str_replace(
            array_keys($searchReplaceArray),
            array_values($searchReplaceArray),
            $content);
    }
    return $data;
}

function convertContentBlog($content)
{
    $data = convertShareToDownload($content);
    return $data;
}

function findCourseWithProduct($product)
{
    $courses = \App\Course::all();
    $product['tags'] = str_replace(", ", ",", $product['tags']);
    $productTags = explode(",", $product['tags']);
    $maxTotalTags = 0;
    $result = null;
    foreach ($courses as $course) {
        $count = 0;
        $course['tags'] = str_replace(", ", ",", $course['tags']);
        $courseTags = explode(",", $course['tags']);
        foreach ($courseTags as $tag)
            if (in_array($tag, $productTags)) {
                $count++;
            }
        if ($count >= $maxTotalTags) {
            $result = $course;
            $maxTotalTags = $count;
        }
    }
    return $result;
}
