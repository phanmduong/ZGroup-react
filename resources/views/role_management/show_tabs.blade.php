@extends('layouts.app')

@section('title','Tabs Management')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">
                Tabs
            </h3>
            <table class="striped responsive-table">
                <thead>
                <tr>
                    <th data-field="name">Name</th>
                    <th data-field="url">Url</th>
                    <th data-field="order">Order</th>
                    <th data-field="parent">Parent</th>
                    <th data-field="parent">Edit</th>
                </tr>
                </thead>

                <tbody>
                @foreach($tabs as $tab)
                    <tr>
                        <td>{{$tab->name}}</td>
                        <td>{{$tab->url}}</td>
                        <td>{{$tab->order}}</td>
                        <td>{{$tab->parent_name}}</td>
                        <td><a class="waves-effect waves-light btn"><i class="material-icons left">input</i>Edit</a></td>
                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>

    </div>
@endsection
