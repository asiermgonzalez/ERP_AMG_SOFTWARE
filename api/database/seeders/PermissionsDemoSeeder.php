<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

/**
 * Para las migraciones:
 * php artisan migrate:fresh --seed --seeder=PermissionsDemoSeeder
 * 
 * Los permisos que se creen aquí hay que crearlos también en el front: app/config/config.ts
 */
class PermissionsDemoSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos: ojo!!! tiene que ser para api no para web (por defecto los crea para web)
        Permission::create(['guard_name' => 'api','name' => 'register_role']);
        Permission::create(['guard_name' => 'api','name' => 'edit_role']);
        Permission::create(['guard_name' => 'api','name' => 'delete_role']);
        Permission::create(['guard_name' => 'api','name' => 'register_user']);

        Permission::create(['guard_name' => 'api','name' => 'edit_user']);
        Permission::create(['guard_name' => 'api','name' => 'delete_user']);
        Permission::create(['guard_name' => 'api','name' => 'register_product']);
        Permission::create(['guard_name' => 'api','name' => 'edit_product']);

        Permission::create(['guard_name' => 'api','name' => 'delete_product']);
        Permission::create(['guard_name' => 'api','name' => 'show_wallet_price_product']);
        Permission::create(['guard_name' => 'api','name' => 'register_wallet_price_product']);
        Permission::create(['guard_name' => 'api','name' => 'edit_wallet_price_product']);

        Permission::create(['guard_name' => 'api','name' => 'delete_wallet_price_product']);
        Permission::create(['guard_name' => 'api','name' => 'register_clientes']);
        Permission::create(['guard_name' => 'api','name' => 'edit_clientes']);
        Permission::create(['guard_name' => 'api','name' => 'delete_clientes']);

        Permission::create(['guard_name' => 'api','name' => 'valid_payments']);
        Permission::create(['guard_name' => 'api','name' => 'reports_caja']);
        Permission::create(['guard_name' => 'api','name' => 'record_contract_process']);
        Permission::create(['guard_name' => 'api','name' => 'egreso']);
        Permission::create(['guard_name' => 'api','name' => 'ingreso']);
        Permission::create(['guard_name' => 'api','name' => 'close_caja']);

        Permission::create(['guard_name' => 'api','name' => 'register_presupuesto_venta']);
        Permission::create(['guard_name' => 'api','name' => 'edit_presupuesto_venta']);
        Permission::create(['guard_name' => 'api','name' => 'delete_presupuesto_venta']);

        Permission::create(['guard_name' => 'api','name' => 'register_pedido_venta']);
        Permission::create(['guard_name' => 'api','name' => 'edit_pedido_venta']);
        Permission::create(['guard_name' => 'api','name' => 'delete_pedido_venta']);

        Permission::create(['guard_name' => 'api','name' => 'register_albaran_venta']);
        Permission::create(['guard_name' => 'api','name' => 'edit_albaran_venta']);
        Permission::create(['guard_name' => 'api','name' => 'delete_albaran_venta']);

        Permission::create(['guard_name' => 'api','name' => 'register_factura_venta']);
        Permission::create(['guard_name' => 'api','name' => 'edit_factura_venta']);
        Permission::create(['guard_name' => 'api','name' => 'delete_factura_venta']);

        Permission::create(['guard_name' => 'api','name' => 'register_presupuesto_compra']);
        Permission::create(['guard_name' => 'api','name' => 'edit_presupuesto_compra']);
        Permission::create(['guard_name' => 'api','name' => 'delete_presupuesto_compra']);

        Permission::create(['guard_name' => 'api','name' => 'register_pedido_compra']);
        Permission::create(['guard_name' => 'api','name' => 'edit_pedido_compra']);
        Permission::create(['guard_name' => 'api','name' => 'delete_pedido_compra']);

        Permission::create(['guard_name' => 'api','name' => 'register_albaran_compra']);
        Permission::create(['guard_name' => 'api','name' => 'edit_albaran_compra']);
        Permission::create(['guard_name' => 'api','name' => 'delete_albaran_compra']);

        Permission::create(['guard_name' => 'api','name' => 'register_factura_compra']);
        Permission::create(['guard_name' => 'api','name' => 'edit_factura_compra']);
        Permission::create(['guard_name' => 'api','name' => 'delete_factura_compra']);

        Permission::create(['guard_name' => 'api','name' => 'register_proforma']);
        Permission::create(['guard_name' => 'api','name' => 'edit_proforma']);
        Permission::create(['guard_name' => 'api','name' => 'delete_proforma']);

        Permission::create(['guard_name' => 'api','name' => 'cronograma']);
        Permission::create(['guard_name' => 'api','name' => 'comisiones']);
        Permission::create(['guard_name' => 'api','name' => 'register_compra']);

        Permission::create(['guard_name' => 'api','name' => 'edit_compra']);
        Permission::create(['guard_name' => 'api','name' => 'delete_compra']);
        Permission::create(['guard_name' => 'api','name' => 'register_transporte']);
        Permission::create(['guard_name' => 'api','name' => 'edit_transporte']);

        Permission::create(['guard_name' => 'api','name' => 'delete_transporte']);
        Permission::create(['guard_name' => 'api','name' => 'despacho']);
        Permission::create(['guard_name' => 'api','name' => 'movimientos']);
        Permission::create(['guard_name' => 'api','name' => 'kardex']);

        // Módulo Taller

        // Módulo RRHH

        // Módulo CallCenter


        // Crear roles y asignar permisos
        $role1 = Role::create(['guard_name' => 'api', 'name' => 'writer']);
        $role1->givePermissionTo('cronograma');

        $role2 = Role::create(['guard_name' => 'api', 'name' => 'admin']);
        $role2->givePermissionTo('register_pedido_venta');
        $role2->givePermissionTo('edit_pedido_venta');
        $role2->givePermissionTo('register_presupuesto_venta');
        $role2->givePermissionTo('edit_presupuesto_venta');

        $role3 = Role::create(['guard_name' => 'api', 'name' => 'Super-Admin']);

        // Crear user
        $user = \App\Models\User::factory()->create([
            'name' => 'Example User',
            'email' => 'tester@example.com',
            'password' => bcrypt('Ay$070400_'),
        ]);
        $user->assignRole($role1);

        // Crear admin
        $user = \App\Models\User::factory()->create([
            'name' => 'Example Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('Ay$070400_'),
        ]);
        $user->assignRole($role2);

        // Crear super-admin
        $user = \App\Models\User::factory()->create([
            'name' => 'Asier',
            'email' => 'asiermgonzalez@outlook.es',
            'password' => bcrypt('Ay$070400_'),
        ]);
        $user->assignRole($role3);
    }
}
