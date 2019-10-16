<?php

namespace App\Models\InformacionPersonal;

use Illuminate\Database\Eloquent\Model;

class DatosPersonales extends Model
{
    protected $table = "datos_personales";

    public function users() {
        return $this->belongsToMany('App\User');
    }
}
