import {packsPageCount} from "../api/packsAPI";
import SuperButton from "../components/SuperButton/SuperButton";

export const MyPagination = ({totalCount, pageCount, currentPage, onClickHandler}: MyPaginationPropsType) => {
    //totalCount - кол-во всех элементов
    //pageCount - кол-во отображаемых элементов дефолтное значение - 10
    //currentPage - текущая страница
    //onClickHandler - функция которая принимает число(страницу) которую нужно отобразить
    if (!pageCount) pageCount = packsPageCount;
    let lastPage = Math.ceil(totalCount / pageCount);
    let num = [1, '<'];
    let from = currentPage;
    let to = from + 3;


    if (currentPage === 1) {
        from = 2;
        to = 5;
    } else if (currentPage <= lastPage && currentPage > lastPage - 5) {
        from = lastPage - 5;
        to = lastPage - 1;
    }

    for (let i = from, k = 2; i <= to; i++, k++) {
        num[k] = i;
    }
    num.push('>');
    num.push(lastPage);

    return (
        <div>
            {num.map(n => {
                if (typeof n === 'number') {
                    return <SuperButton key={n} red={n === currentPage} onClick={() => {
                        onClickHandler(n)
                    }}>{n}</SuperButton>
                } else {
                    if (n === '<' && currentPage > 2) {
                        return <SuperButton key={n} onClick={() => {
                            onClickHandler(from - 1)
                        }}>{n}</SuperButton>
                    }

                    if (n === '>' && currentPage < lastPage - 4) {
                        return <SuperButton key={n} onClick={() => {
                            onClickHandler(to + 1)
                        }}>{n}</SuperButton>
                    }
                }

            })}
        </div>
    )
}

type MyPaginationPropsType = {
    totalCount: number
    pageCount?: number
    currentPage: number
    onClickHandler: (value: number) => void
}
