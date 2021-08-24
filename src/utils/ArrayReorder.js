export const arrayReorder = (list, startIndex, endIndex) =>{
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    console.log(result)
    console.log(list)
    return result
}
