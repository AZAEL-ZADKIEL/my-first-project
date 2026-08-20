import { Empleados } from "./empleados";

export class Nomina_Empleado {
    empleado : Empleados = new Empleados();
    salario : number | undefined = undefined;
    salud : number | undefined = undefined;
    pension : number | undefined = undefined;
    bonificacion : number | undefined = undefined;
    prima : number | undefined = undefined;
}
