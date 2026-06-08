/**
 * Menú lateral dinámico, construido desde `menus[]` del login.
 *
 * Los ítems llegan en una lista plana con `idMenuPadre`; aquí se arma el árbol
 * (filtrando `visible`, ordenando por `orden`) y se renderiza recursivamente.
 * Solo los controladores con página implementada en esta app son navegables;
 * el resto se muestra deshabilitado (sin links rotos).
 */

import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import type { MenuItem } from '../../types/auth';

interface MenuNode extends MenuItem {
  children: MenuNode[];
}

/** Rutas implementadas en esta app, mapeadas por `controlador`. */
const ROUTES: Record<string, string> = {
  MaestraPreciosArandano: '/administracion/maestra-precios-arandanos',
};

function buildTree(items: MenuItem[]): MenuNode[] {
  const visible = items.filter((i) => i.visible);
  const byParent = new Map<number | null, MenuItem[]>();
  for (const it of visible) {
    const list = byParent.get(it.idMenuPadre) ?? [];
    list.push(it);
    byParent.set(it.idMenuPadre, list);
  }
  const build = (parentId: number | null): MenuNode[] =>
    (byParent.get(parentId) ?? [])
      .slice()
      .sort((a, b) => a.orden - b.orden)
      .map((it) => ({ ...it, children: build(it.id) }));
  return build(null);
}

function MenuNodeItem({ node, level }: { node: MenuNode; level: number }) {
  const [open, setOpen] = useState(level === 0);
  const hasChildren = node.children.length > 0;
  const route = ROUTES[node.controlador];
  const pad = { paddingLeft: `${level * 12 + 12}px` };

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={pad}
          className="flex w-full items-center justify-between py-2 pr-3 text-left
            text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <span>{node.descripcion}</span>
          <span className="text-xs text-gray-400">{open ? '▾' : '▸'}</span>
        </button>
        {open && (
          <ul>
            {node.children.map((child) => (
              <MenuNodeItem key={child.id} node={child} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Hoja: navegable solo si la ruta está implementada.
  return (
    <li>
      {route ? (
        <NavLink
          to={route}
          style={pad}
          className={({ isActive }) =>
            `block py-2 pr-3 text-sm hover:bg-gray-100 ${
              isActive ? 'bg-blue-50 font-medium text-blue-700' : 'text-gray-600'
            }`
          }
        >
          {node.descripcion}
        </NavLink>
      ) : (
        <span
          style={pad}
          className="block cursor-not-allowed py-2 pr-3 text-sm text-gray-400"
          title="No disponible en esta app"
        >
          {node.descripcion}
        </span>
      )}
    </li>
  );
}

export function MenuSidebar() {
  const menus = useAuthStore((s) => s.menus);
  const tree = useMemo(() => buildTree(menus), [menus]);

  return (
    <nav className="h-full w-64 overflow-y-auto border-r border-gray-200 bg-white">
      <ul className="py-2">
        {tree.map((node) => (
          <MenuNodeItem key={node.id} node={node} level={0} />
        ))}
      </ul>
    </nav>
  );
}
