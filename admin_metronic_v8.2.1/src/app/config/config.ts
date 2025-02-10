import { environment } from 'src/environments/environment';

export const URL_BACKEND = environment.URL_BACKEND;
export const URL_SERVICIOS = environment.URL_SERVICIOS;
export const URL_FRONTEND = environment.URL_FRONTEND;

/*
 * Roles y permisos
 * Los roles y permisos que se creen aquí también hay que crearlos en la base de datos y en database/seeders/PermisisonDemoSeeder.php
 */
export const SIDEBAR: any = [
  {
    name: 'Roles',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_role',
      },
      {
        name: 'Editar',
        permiso: 'edit_role',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_role',
      },
    ],
  },
  {
    name: 'Usuarios',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_user',
      },
      {
        name: 'Editar',
        permiso: 'edit_user',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_user',
      },
    ],
  },
  {
    name: 'Productos',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_product',
      },
      {
        name: 'Editar',
        permiso: 'edit_product',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_product',
      },
      {
        name: 'Ver billetera de precios',
        permiso: 'show_wallet_price_product',
      },
      {
        name: 'Nuevo precio',
        permiso: 'register_wallet_price_product',
      },
      {
        name: 'Editar precio',
        permiso: 'edit_wallet_price_product',
      },
      {
        name: 'Eliminar precio',
        permiso: 'delete_wallet_price_product',
      },
    ],
  },
  {
    name: 'Clientes',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_clientes',
      },
      {
        name: 'Editar',
        permiso: 'edit_clientes',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_clientes',
      },
    ],
  },
  {
    name: 'Caja',
    permisos: [
      {
        name: 'Validar pagos',
        permiso: 'valid_payments',
      },
      {
        name: 'Reporte de caja',
        permiso: 'reports_caja',
      },
      {
        name: 'Historial de contratos procesados',
        permiso: 'record_contract_process',
      },
      {
        name: 'Egreso (Salida de efectivo)',
        permiso: 'egreso',
      },
      {
        name: 'Ingreso',
        permiso: 'ingreso',
      },
      {
        name: 'Cierre de caja',
        permiso: 'close_caja',
      },
    ],
  },
  {
    name: 'Proforma',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_proforma',
      },
      {
        name: 'Editar',
        permiso: 'edit_proforma',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_proforma',
      },
    ],
  },
  {
    name: 'Prespuesto compra',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_presupuesto_compra',
      },
      {
        name: 'Editar',
        permiso: 'edit_presupuesto_compra',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_presupuesto_compra',
      },
    ],
  },
  {
    name: 'Pedido compra',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_pedido_compra',
      },
      {
        name: 'Editar',
        permiso: 'edit_pedido_compra',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_pedido_compra',
      },
    ],
  },
  {
    name: 'Albarán compra',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_albaran_compra',
      },
      {
        name: 'Editar',
        permiso: 'edit_albaran_compra',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_albaran_compra',
      },
    ],
  },
  {
    name: 'Factura compra',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_factura_compra',
      },
      {
        name: 'Editar',
        permiso: 'edit_factura_compra',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_factura_compra',
      },
    ],
  },
  {
    name: 'Prespuesto venta',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_presupuesto_venta',
      },
      {
        name: 'Editar',
        permiso: 'edit_presupuesto_venta',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_presupuesto_venta',
      },
    ],
  },
  {
    name: 'Pedido venta',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_pedido_venta',
      },
      {
        name: 'Editar',
        permiso: 'edit_pedido_venta',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_pedido_venta',
      },
    ],
  },
  {
    name: 'Albarán venta',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_albaran_venta',
      },
      {
        name: 'Editar',
        permiso: 'edit_albaran_venta',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_albaran_venta',
      },
    ],
  },
  {
    name: 'Factura venta',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_factura_venta',
      },
      {
        name: 'Editar',
        permiso: 'edit_factura_venta',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_factura_venta',
      },
    ],
  },
  {
    name: 'Cronograma',
    permisos: [
      {
        name: 'Disponible',
        permiso: 'cronograma',
      },
    ],
  },
  {
    name: 'Comisiones',
    permisos: [
      {
        name: 'Disponible',
        permiso: 'comisiones',
      },
    ],
  },
  {
    name: 'Compras',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_compra',
      },
      {
        name: 'Editar',
        permiso: 'edit_compra',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_compra',
      },
    ],
  },
  {
    name: 'Transporte',
    permisos: [
      {
        name: 'Registrar',
        permiso: 'register_transporte',
      },
      {
        name: 'Editar',
        permiso: 'edit_transporte',
      },
      {
        name: 'Eliminar',
        permiso: 'delete_transporte',
      },
    ],
  },
  {
    name: 'Despacho',
    permisos: [
      {
        name: 'Disponible',
        permiso: 'despacho',
      },
    ],
  },
  {
    name: 'Movimientos',
    permisos: [
      {
        name: 'Disponible',
        permiso: 'movimientos',
      },
    ],
  },
  {
    name: 'Kardex',
    permisos: [
      {
        name: 'Disponible',
        permiso: 'kardex',
      },
    ],
  },
];
