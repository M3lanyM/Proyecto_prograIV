export function calculate(num1:number,num2:number,num3:number,route:number): number{
    if(route<100){
        return num1 + num2 + num3 + 100;
    }
    if(route>100 && route<200){
        return num1 + num2 + num3 + 200;
    }
    if(route>100){
        return num1 + num2 + num3 + 300;
    }
    return 0;
}