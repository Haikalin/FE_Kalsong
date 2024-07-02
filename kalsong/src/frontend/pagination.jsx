import React from "react";

const Pagination = ({onChangePage, onchangeBgPage}) => {
    let pages = []
    const totalData = 50
    const dataPerPage = 10
    for(let i = 0; i < 5; i++) {
        pages.push(i)
    }
    return (
        <div class="w-1/2 h-16 mx-auto flex justify-center align-middle items-center mb-10 ">
            <div class="flex">
                {pages.map((page) => {
                    const idpage = page + 1
                    return (
                        <button id={"buttonpage"+idpage} class="w-10 h-10 flex justify-center mx-2 items-center bg-spotify-black text-white" onClick={() => {onChangePage(page + 1); onchangeBgPage("buttonpage"+idpage)}}>{page + 1}</button>
                    )
                })}
            </div>
        </div>
    );
}

export default Pagination;