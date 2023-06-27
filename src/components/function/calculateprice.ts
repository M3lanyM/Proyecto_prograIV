export function calculate(num1:number,num2:number,num3:number,route:number): number{
    if(route<=100){
        return num1*3+300 + num2*2+220 + num3*3+750 + 100;
    }
    if(route>100 && route<=299){
        return num1*3+300 + num2*2+220 + num3*3+750 + 400;
    }
    if(route>=300){
        return num1*3+300 + num2*2+220 + num3*3+750 + 800;
    }
    return 0;
}