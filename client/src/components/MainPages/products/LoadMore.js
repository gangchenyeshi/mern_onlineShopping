import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] =state.productsAPI.page;
    const [result] =state.productsAPI.result;   

    return (
        <div className="container-fluid mb-3 mt-3">
            <div className="row d-flex justify-content-center">
                {
                    result < page * 9 ? ""
                        : <button onClick={() => setPage(page + 1)}
                            className="btn btn-dark col-6 col-md-2"
                        >Load more</button>
                }
            </div>
        </div>
    )
}

export default LoadMore
