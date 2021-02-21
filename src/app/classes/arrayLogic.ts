export const removeElement = (arr: Array<any>, ele: any): any => {
    const index = arr.indexOf(ele);
    if (index > -1) return arr.splice(index, 1)[0];
    else return undefined;
};
