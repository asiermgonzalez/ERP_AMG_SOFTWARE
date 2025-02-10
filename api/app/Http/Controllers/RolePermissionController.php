<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    /**
     * Devuelve listado de roles y permisos
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $search = $request->get('search');

        $roles = Role::with('permissions')->where('name', 'like', "%$search%")->orderBy('id', 'desc')->paginate(25);

        return response()->json(
            [
                'total' => $roles->total(),
                'roles' => $roles->map(function ($rol) {
                    // Devuelve un array con los nombres de los permisos
                    $rol->permission_pluck = $rol->permissions->pluck('name');
                    // Formatea la fecha
                    $rol->created_format_at = $rol->created_at->format('Y-m-d h:i A');
                    return $rol;
                }),
            ]
        );
    }


    /**
     * Guarda los permisos de un rol
     */
    public function store(Request $request)
    {
        $IS_ROLE = Role::where('name', $request->name)->first();

        // Comprueba si el rol ya existe
        if ($IS_ROLE) {
            return response()->json(['message' => 403, 'message_text' => 'El rol ya existe']);
        }

        // Crea el rol
        $role = Role::create(['guard_name' => 'api', 'name' => $request->name]);

        // Asigna los permisos al rol. Nos llega algo similar a esto: ["register_role","edit_role","delete_role"]
        foreach ($request->permissions as $key => $permission) {
            $role->givePermissionTo($permission);
        }

        // Devuelve los permisos del rol creado
        return response()->json([
            'message' => 200,
            'role' =>
            [
                'id' => $role->id,
                'permission' => $role->permissions,
                'permission_pluck' => $role->permissions->pluck('name'),
                'created_at' => $role->created_at->format('Y-m-d h:i A'),
                'name' => $role->name,
            ]
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Actualiza un rol y sus permisos
     */
    public function update(Request $request, string $id)
    {
        $IS_ROLE = Role::where('name', $request->name)->where('id', '<>', $id)->first();

        // Comprueba si el rol ya existe
        if ($IS_ROLE) {
            return response()->json(['message' => 403, 'message_text' => 'El rol ya existe']);
        }

        // Buscar el rol
        $role = Role::findOrFail($id);

        // Actualiza el rol
        $role->update($request->all());

        // Asigna los permisos al rol.
        $role->syncPermissions($request->permissions);

        // Devuelve los permisos del rol actualizado
        return response()->json([
            'message' => 200,
            'role' =>
            [
                'id' => $role->id,
                'permission' => $role->permissions,
                'permission_pluck' => $role->permissions->pluck('name'),
                'created_format_at' => $role->created_at->format('Y-m-d h:i A'),
                'name' => $role->name,
            ]
        ]);
    }

    /**
     * Elimina un rol
     */
    public function destroy(string $id)
    {
        // Buscar el rol
        $role = Role::findOrFail($id);

        // Elimina el rol
        $role->delete();

        return response()->json(['message' => 200]);
    }
}
