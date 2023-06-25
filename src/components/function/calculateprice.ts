export function calculate(num1:number,num2:number,num3:number,route:number): number{
    if(route<100){
        return num1*3 + num2*2 + num3*3 + 100;
    }
    if(route>100 && route<200){
        return num1*3 + num2*2 + num3*3 + 400;
    }
    if(route>100){
        return num1*3 + num2*2 + num3*3 + 800;
    }
    return 0;
}