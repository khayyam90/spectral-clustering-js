export class Utils {	
    public static sum(items: Array<number>): number{
        let result = 0;
        items.forEach(c => {
            result += c;
        });
        return result;
    }

    public static max(items: Array<number>): number{
        let result = items[0];
        items.forEach(c => {
            if (c > result){
                result = c;
            }
        });
        return result;
    }

    public static maxIndex(items: Array<number>): number{
        let result = 0;
        items.forEach( (c,i) => {
            if (c > items[result]){
                result = i;
            }
        });
        return result;
    }

    public static min(items: Array<number>): number{
        let result = items[0];
        items.forEach(c => {
            if (c < result){
                result = c;
            }
        });
        return result;
    }

    public static mean(items: Array<number>): number{
        return Utils.sum(items) / items.length;
    }

    /**     
     * @param defaults Merges two maps
     * @param requested 
     */
    public static resolveRunningParameters(defaults: Map<string, string|number>, requested: Map<string, string|number>):Map<string, string|number>{
        const result = new Map<string, string|number>();

        defaults.forEach((v,k) => {
            if (requested.has(k)){
                result.set(k, requested.get(k));
            }else{
                result.set(k, defaults.get(k));
            }
        });

        return result;
    }
}