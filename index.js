// Import stylesheets
import './style.css';

export const groupByParent = (data, parent = null, complete = []) => {
  let result = [];
  data.forEach((item) => {
    console.log('item: ', item);
    if (item.parent === parent) {
      const newItem = { ...item };
      const children = groupByParent(data, item.id, complete);
      if (children.length > 0) {
        newItem.items = children;
      }
      result.push(newItem);
    } else if (parent === null) {
      // Si el objeto padre no existe en el arreglo result, crea un nuevo objeto padre
      const parentExists = result.some(
        (parentItem) =>
          parentItem.id === item.parent ||
          (parentItem.items &&
            parentItem.items.some((childItem) => childItem.id === item.parent))
      );
      if (!parentExists) {
        const nParent = complete.find((e) => e.id == item.parent);
        nParent.items = [item];
        if (nParent.parent) {
          result = result.map((r) => {
            if (r.id == nParent.parent) {
              r['items'].push(nParent);
              return r;
            } else {
              return r;
            }
          });
        } else {
          result.push(nParent);
        }
      } else {
        result = result.map((r) => {
          console.log(r);
          if (r.id == item.parent && !r.items.find((it) => it.id == item.id)) {
            r['items'].push(item);
          }
          return r;
        });
        result.push(item);
      }
    }
  });
  return result;
};

let permisions = [
  {
    id: 2,
    name: 'Rutas',
    label: 'Rutas',
    to: '/ke-routes',
    icon: 'AltRouteIcon',
    parent: null,
  },
  {
    id: 1,
    name: 'Usuarios',
    label: 'Usuarios',
    to: '/users',
    icon: 'AdminPanelSettingsIcon',
    parent: null,
  },
  {
    id: 3,
    name: 'Permisos',
    label: 'Permisos',
    to: '/ke-permisions',
    icon: 'SwitchAccessShortcutAddIcon',
    parent: null,
  },
  {
    id: 5,
    name: 'Roles',
    label: 'Roles',
    to: '/ke-roles',
    icon: 'GppBad',
    parent: null,
  },
  {
    id: 6,
    name: 'Roles | Permisos',
    label: 'Roles | Permisos',
    to: '/ke-role-permisions',
    icon: 'AddRoad',
    parent: null,
  },
  {
    id: 3,
    name: 'Permisos',
    label: 'Permisos',
    to: '/ke-permisions',
    icon: 'SwitchAccessShortcutAddIcon',
    parent: null,
  },
];
let allRoutes = [
  {
    id: 1,
    name: 'Usuarios',
    label: 'Usuarios',
    to: '/users',
    icon: 'AdminPanelSettingsIcon',
    parent: null,
  },
  {
    id: 2,
    name: 'Rutas',
    label: 'Rutas',
    to: '/ke-routes',
    icon: 'AltRouteIcon',
    parent: null,
  },
  {
    id: 3,
    name: 'Permisos',
    label: 'Permisos',
    to: '/ke-permisions',
    icon: 'SwitchAccessShortcutAddIcon',
    parent: null,
  },
  {
    id: 4,
    name: 'Administrador',
    label: 'Administrador',
    to: null,
    icon: 'AdminPanelSettingsIcon',
    parent: null,
  },
  {
    id: 5,
    name: 'Roles',
    label: 'Roles',
    to: '/ke-roles',
    icon: 'GppBad',
    parent: null,
  },
  {
    id: 6,
    name: 'Roles | Permisos',
    label: 'Roles | Permisos',
    to: '/ke-role-permisions',
    icon: 'AddRoad',
    parent: null,
  },
];

console.log(groupByParent(permisions, null, allRoutes));
