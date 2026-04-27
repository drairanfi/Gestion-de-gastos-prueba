const KEY = 'gastos:v1';

export function obtenerGastos() {
    try{
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Error leyendo gastos:', error);
        return [];
    }
}

export function guardarGasto(gastos) {
    localStorage.setItem(KEY, JSON.stringify(gastos));
}

export function agregarGasto(datos) {
    const gastos = obtenerGastos();
    const nuevo = {
        id: crypto.randomUUID(),
        descripcion: datos.descripcion,
        monto: datos.monto,
        categoria: datos.categoria,
        fecha: datos.fecha,
        createdAt: new Date().toISOString()
    };
    gastos.push(nuevo);
    guardarGasto(gastos);
    return nuevo;
    }
