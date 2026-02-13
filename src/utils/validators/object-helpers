export const updateObjectInArray = (items, itemId, propsName, newObjProps) => {
    return items.map(u => {
        if (u[propsName] === itemId) {
            return { ...u, ...newObjProps }
        }
        return u;
    });
}
