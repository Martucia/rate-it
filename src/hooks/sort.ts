export function sortItems(items: any, sortParam: string, filterParam?: string | string[], filterValue?: string | number | null) {
    if (!items) return null;

    const filteredItems = filterParam && filterValue
        ? items.filter((item: any) => item.project.id === filterValue)
        : items;

    const sortedItems = [...filteredItems]
        .sort((a: any, b: any) => a[sortParam] - b[sortParam]);

    return sortedItems;

}