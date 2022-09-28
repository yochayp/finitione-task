export const generateQeury = (filter,orderBy,order,page, tpp) => {
    let query = '?';
    Object.keys(filter).forEach((key)=> {
        query+='filter['+key+']='+filter[key]+'&'
    });
    if ( orderBy ) query+='orderBy='+orderBy+'&';
    if ( order ) query += 'order='+order+'&';
    query+= 'page=' + page+'&';
    query += 'tpp=' + tpp;
    return query;
}