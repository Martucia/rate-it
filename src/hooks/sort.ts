export function sortItems(items: any, sortParam: string) {
    if (!items) return null;

    const sortedItems = [...items]
        .sort((a: any, b: any) => a[sortParam] - b[sortParam]);

    return sortedItems;

}