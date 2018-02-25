<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\EmailMaketing\Entities\EmailForms;

class User extends Authenticatable
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'username',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    protected $dates = ['deleted_at'];
    /*
    |--------------------------------------------------------------------------
    | ACL Methods
    |--------------------------------------------------------------------------
    */
    /**
     * Checks a Permission
     *
     * @param  String permission Slug of a permission (i.e: manage_user)
     * @return Boolean true if has permission, otherwise false
     */
    public function havePermission($permission = null)
    {
        return !is_null($permission) && $this->checkPermission($permission);
    }

    public function accessTab($tab = null)
    {
        return !is_null($tab) && $this->checkTab($tab);
    }

    public function havePermissionTab($tab = null)
    {
        return !is_null($tab) && $this->checkPermissionTab($tab);
    }

    public function checkPermissionTab($tab)
    {
        $tabs = $this->roles->tabs->pluck('id')->toArray();

        return in_array($tab->id, $tabs);
    }

    public function isStaff()
    {
        return $this->role == 1;
    }

    public function isAdmin()
    {
        return $this->role == 2;
    }

    public function current_role()
    {
        return $this->belongsTo('App\Role', 'role_id');
    }

    public function tasks()
    {
        return $this
            ->belongsToMany(Task::class, "user_task", "user_id", "task_id")
            ->withTimestamps();
    }

    public function infoCustomerGroups()
    {
        return $this->belongsToMany(InfoCustomerGroup::class, 'customer_groups', 'customer_id', 'customer_group_id');
    }

    public function department()
    {
        return $this->belongsTo("App\Department", "department_id");
    }

    public function works()
    {
        return $this->belongsToMany(Work::class, 'work_staff', 'staff_id', 'work_id');
    }

    /**
     * Check if the permission matches with any permission user has
     *
     * @param  String permission slug of a permission
     * @return Boolean true if permission exists, otherwise false
     */
    protected function checkPermission($perm)
    {
        $permissions = $this->getAllPernissionsFormAllRoles();
        $permissionArray = is_array($perm) ? $perm : [$perm];

        return count(array_intersect($permissions, $permissionArray));
    }

    protected function checkTab($tab)
    {
        $tabs = $this->getAllTabsFromAllRoles();
        $tabArray = is_array($tab) ? $tab : [$tab];

        return count(array_intersect($tabs, $tabArray));
    }

    /**
     * Get all permission slugs from all permissions of all roles
     *
     * @return Array of permission slugs
     */
    protected function getAllPernissionsFormAllRoles()
    {
        $permissionsArray = [];
        $permissions = $this->roles->load('permissions')->fetch('permissions')->toArray();
        return array_map('strtolower', array_unique(array_flatten(array_map(function ($permission) {
            return array_fetch($permission, 'permission_slug');

        }, $permissions))));
    }

    protected function getAllTabsFromAllRoles()
    {
        $tabs = $this->roles->load('tabs')->fetch('tabs')->toArray();
        return array_map('strtolower', array_unique(array_flatten(array_map(function ($tab) {
            return array_fetch($tab, 'tab_slug');
        }, tabs))));
    }

    /*
    |--------------------------------------------------------------------------
    | Relationship Methods
    |--------------------------------------------------------------------------
    */
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

    public function roles()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function registers()
    {
        return $this->hasMany('App\Register', 'user_id', 'id');
    }

    public function teach()
    {
        return $this->hasMany('App\StudyClass', 'teacher_id', 'id');
    }

    public function assist()
    {
        return $this->hasMany('App\StudyClass', 'teaching_assistant_id', 'id');
    }

    public function calls()
    {
        return $this->hasMany('App\TeleCall', 'caller_id', 'id');
    }

    public function is_called()
    {
        return $this->hasMany('App\TeleCall', 'student_id');
    }

    public function get_money()
    {
        return $this->hasMany('App\Register', 'staff_id');
    }

    public function send_transactions()
    {
        return $this->hasMany('App\Transaction', 'sender_id');
    }

    public function receive_transactions()
    {
        return $this->hasMany('App\Transaction', 'receiver_id');
    }

    public function products()
    {
        return $this->hasMany('App\Product', 'author_id');
    }

    public function likes()
    {
        return $this->hasMany('App\Like', 'liker_id');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment', 'commenter_id');
    }

    public function acted_notifications()
    {
        return $this->hasMany('App\Notification', 'actor_id');
    }

    public function received_notifications()
    {
        return $this->hasMany('App\Notification', 'receiver_id');
    }

    public function surveys()
    {
        return $this->hasMany('App\Survey', 'user_id');
    }

    public function survey_users()
    {
        return $this->hasMany('App\SurveyUser', 'user_id');
    }

    public function views()
    {
        return $this->hasMany('App\View', 'viewer_id');
    }

    public function images()
    {
        return $this->hasMany('App\Image', 'owner_id');
    }

    public function email_templates()
    {
        return $this->hasMany('App\EmailTemplate', 'owner_id');
    }

    public function votes()
    {
        return $this->hasMany('App\Vote', 'voter_id');
    }

    public function cvs()
    {
        return $this->hasMany('App\CV', 'user_id');
    }

    public function cv()
    {
        return $this->belongsTo('App\CV', 'cv_id');
    }

    public function groups()
    {
        return $this->belongsToMany('App\Group', 'group_members', 'user_id', 'group_id');
    }

    public function sale_registers()
    {
        return $this->hasMany('App\Register', 'saler_id');
    }

    public function base()
    {
        return $this->belongsTo(Base::class, 'base_id');
    }

    public function email_forms()
    {
        return $this->hasMany(EmailForms::class, 'creator');
    }

    public function cards()
    {
        return $this->belongsToMany(Card::class, "card_user", "user_id", "card_id");
    }

    public function calendarEvents()
    {
        return $this->hasMany(CalendarEvent::class, "user_id");
    }

    public function projects()
    {
        return $this->belongsToMany(
            Project::class,
            'project_user', 'user_id',
            'project_id')
            ->withPivot('role', "adder_id")
            ->withTimestamps();
    }

    public function rules()
    {
        return $this->hasMany(Rule::class, 'creator_id');
    }

    public function checkInCheckOuts()
    {
        return $this->hasMany(CheckInCheckOut::class, "user_id");
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'followings', 'following_id', 'followed_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followings', 'followed_id', 'following_id');
    }

    public function getData()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            "avatar_url" => $this->avatar_url ? generate_protocol_url($this->avatar_url) : defaultAvatarUrl(),
            'role' => $this->current_role ? $this->current_role->getData() : null,
        ];
    }

    public function personalEmails()
    {
        return $this->hasMany(PersonalEmail::class, "user_id");
    }

    public function transformAuth()
    {
        return [
            "id" => $this->id,
            "avatar_url" => generate_protocol_url($this->avatar_url),
            "name" => $this->name ? $this->name : "",
            "first_login" => $this->first_login,
            "email" => $this->email ? $this->email : "",
            "phone" => $this->phone ? $this->phone : "",
            "facebook_id" => $this->facebook_id ? $this->facebook_id : ""
        ];
    }

    public function tranform()
    {
        $data = $this->registers->map(function ($register) {
            return [
                'avatar_url' => $register->studyClass->course->icon_url,
                'class_name' => $register->studyClass->name,
                'course_name' => $register->studyClass->course->name,
                'link' => '/course/' . convert_vi_to_en($register->studyClass->course->name),
                'saler_name' => $register->saler ? $register->saler->name : null,
            ];
        }
        );
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'university' => $this->university,
            'work' => $this->work,
            'avatar_url' => $this->avatar_url,
            'link' => '/profile/' . $this->username,
            'registers' => $data,
        ];
    }

    public function transfromCustomer()
    {
        $orders = Order::where("user_id", $this->id)->get();
        if (count($orders) > 0) $canDelete = "false"; else $canDelete = "true";
        $totalMoney = 0;
        $totalPaidMoney = 0;
        $lastOrder = 0;
        foreach ($orders as $order) {
            $goodOrders = $order->goodOrders()->get();
            foreach ($goodOrders as $goodOrder) {
                $totalMoney += $goodOrder->quantity * $goodOrder->price;
            }
            $lastOrder = $order->created_at;
        }
        foreach ($orders as $order) {
            $orderPaidMoneys = $order->orderPaidMoneys()->get();
            foreach ($orderPaidMoneys as $orderPaidMoney) {
                $totalPaidMoney += $orderPaidMoney->money;
            }
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'birthday' => $this->dob,
            "first_login" => $this->first_login,
            'gender' => $this->gender,
            'avatar_url' => $this->avatar_url ? $this->avatar_url : "http://colorme.vn/img/user.png",
            'last_order' => $lastOrder ? format_vn_short_datetime(strtotime($lastOrder)) : "Chưa có",
            'total_money' => $totalMoney,
            'total_paid_money' => $totalPaidMoney,
            'debt' => $totalMoney - $totalPaidMoney,
            'can_delete' => $canDelete
        ];
    }

    public function transferMoneys()
    {
        return $this->hasMany(TransferMoney::class, 'user_id');
    }

    public function bank_count()
    {
        return $this->hasMany(BankAccount::class, 'user_id');
    }

    public function userLessonSurveys()
    {
        return $this->hasMany(UserLessonSurvey::class, "user_id");
    }
}

