import {defaultPacksPageCount} from "../api/packsAPI";
import SuperButton from "../components/SuperButton/SuperButton";
import {useEffect, useState} from "react";

export const MyPagination = ({totalCount, pageCount, currentPage, onClickHandler}: MyPaginationPropsType) => {
    //totalCount - кол-во всех элементов
    //pageCount - кол-во отображаемых элементов дефолтное значение - 10
    //currentPage - текущая страница
    //onClickHandler - функция которая принимает число(страницу) которую нужно отобразить
    const [page, setPage] = useState(currentPage);
    useEffect(() => {
        setPage(currentPage)
    }, [currentPage])

    if (!pageCount) pageCount = defaultPacksPageCount;
    let lastPage = Math.ceil(totalCount / pageCount);
    let num = [1, '<'];
    let from = page;
    let to = from + 3;

    if (lastPage === 1) {
        return <SuperButton red onClick={() => {
            onClickHandler(1)
        }}>1</SuperButton>;
    }

    if (lastPage <= 5) {
        for (let i = 1; i <= lastPage; i++) {
            num.push(i);
        }
    } else {
        if (page === 1) {
            from = 2;
            to = 5;
        } else if (page <= lastPage && page > lastPage - 5) {
            from = lastPage - 5;
            to = lastPage - 1;
        }

        for (let i = from, k = 2; i <= to; i++, k++) {
            num[k] = i;
        }
        num.push('>');
        num.push(lastPage);
    }


    return (
        <div>
            {num.map(n => {
                if (typeof n === 'number') {
                    return <SuperButton key={n} red={n === page} onClick={() => {
                        onClickHandler(n)
                    }}>{n}</SuperButton>
                } else {
                    if (n === '<' && page > 2) {
                        return <SuperButton key={n} onClick={() => {
                            onClickHandler(from - 1)
                        }}>{n}</SuperButton>
                    }

                    if (n === '>' && page < lastPage - 4) {
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
