export const updateObjectInArray = (items: any, itemId: any, propsName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[propsName] === itemId) {
            return { ...u, ...newObjProps }
        }
        return u;
    });
}
