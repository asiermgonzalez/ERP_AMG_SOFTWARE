<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserAccessController extends Controller
{
    /**
     * Devuelve listado de usuarios
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * autor Asier Martín
     * date 2025-02-08
     * version 1.0
     * 
     */
    public function index(Request $request)
    {
        $search = $request->get('search');

        $users = User::where('name', 'like', "%$search%")->orderBy('id', 'desc')->paginate(25);

        return response()->json(
            [
                'total' => $users->total(),
                'users' => $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'surname' => $user->surname,
                        'full_name' => $user->name . ' ' . $user->surname,
                        'phone' => $user->phone,
                        'role_id' => $user->role_id,
                        'role' => $user->role,
                        'roles' => $user->roles,
                        'sucursal_id' => $user->sucursal_id,
                        'type_document' => $user->type_document,
                        'n_document' => $user->n_document,
                        'gender' => $user->gender,
                        'avatar' => $user->avatar ? env('APP_URL') . 'storage/' . $user->avatar : null,
                        'created_format_at' => $user->created_at->format('d-m-Y h:i A'),
                    ];
                }),
            ]
        );
    }


    /**
     * Guarda un nuevo usuario
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * autor Asier Martín
     * date 2025-02-10
     * version 1.0
     */
    public function store(Request $request)
    {
        $user_exist = User::where('email', $request->email)->first();

        if ($user_exist) return response()->json(['message' => 403, 'message_text' => 'El usuario ya existe']);

        if ($request->hasFile('imagen')) {
            // Guardamos la imagen en el servidor
            $path = Storage::putFile('users', $request->file('imagen'));
            $request->request->add(['avatar' => $path]);
        }

        if ($request->password) {
            $request->request->add(['password' => bcrypt($request->password)]);
        }

        $role = Role::findOrFail($request->role_id);
        $user = User::create($request->all());
        $user->assignRole($role);

        return response()->json([
            'message' => 200,
            'message_text' => 'Usuario creado correctamente',
            'user' =>
            [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'surname' => $user->surname,
                'full_name' => $user->name . ' ' . $user->surname,
                'phone' => $user->phone,
                'role_id' => $user->role_id,
                'role' => $user->role,
                'roles' => $user->roles,
                'sucursal_id' => $user->sucursal_id,
                'type_document' => $user->type_document,
                'n_document' => $user,
                'gender' => $user->gender,
                'avatar' => $user->avatar ? env('APP_URL') . 'storage/' . $user->avatar : null,
                'created_format_at' => $user->created_at->format('d-m-Y h:i A'),
            ]
        ]);
    }


    /**
     * Editar un usuario
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * autor Asier Martín
     * date 2025-02-10
     * version 1.0
     */
    public function update(Request $request, string $id)
    {
        $user_exist = User::where('email', $request->email)->where('id', '<>', $id)->first();

        if ($user_exist) return response()->json(['message' => 403, 'message_text' => 'El usuario ya existe']);

        // Obtenemos el usuario que queremos editar
        $user = User::findOrFail($id);

        // Si llega una imagen se elimina la anterior y se guarda la nueva
        if ($request->hasFile('imagen')) {
            if ($user->avatar) Storage::delete($user->avatar);
            $path = Storage::putFile('users', $request->file('imagen'));
            $request->request->add(['avatar' => $path]);
        }

        // Si llega una contraseña se encripta
        if ($request->password) {
            $request->request->add(['password' => bcrypt($request->password)]);
        }

        // Eliminamos el rol anterior y asignamos el nuevo rol
        if ($request->role_id != $user->role_id) {
            $role_old = Role::findOrFail($user->role_id);
            $user->removeRol($role_old);

            $role = Role::findOrFail($request->role_id);
            $user->assignRole($role);
        }

        // Actualizamos los datos del usuario
        $user->update($request->all());

        return response()->json([
            'message' => 200,
            'message_text' => 'Usuario creado correctamente',
            'user' =>
            [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'surname' => $user->surname,
                'full_name' => $user->name . ' ' . $user->surname,
                'phone' => $user->phone,
                'role_id' => $user->role_id,
                'role' => $user->role,
                'roles' => $user->roles,
                'sucursal_id' => $user->sucursal_id,
                'type_document' => $user->type_document,
                'n_document' => $user,
                'gender' => $user->gender,
                'avatar' => $user->avatar ? env('APP_URL') . 'storage/' . $user->avatar : null,
                'created_format_at' => $user->created_at->format('d-m-Y h:i A'),
            ]
        ]);
    }


    /**
     * Eliminar un usuario
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * autor Asier Martín
     * date 2025-02-10
     * version 1.0
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        
        // Eliminar la imagen
        if ($user->avatar) Storage::delete($user->avatar);

        // Eliminar el usuario
        $user->delete();

        return response()->json(['message' => 200,]);
    }
}