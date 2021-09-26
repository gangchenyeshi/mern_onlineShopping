import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';


function Filters() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [categories, setCategories] = state.categoriesAPI.categories;

    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;
    const [category, setCategory] = state.productsAPI.category;

    const handleCategory = e => {
        setCategory(e.target.value);
        setSearch('')
    }
    return (
        <div className="container-fluid px-0">
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-5">
                    <div className="input-group mt-3">
                        <label className="input-group-text" for="inputGroupSelect01">Search </label>
                        <input type="text" className="form-control"  id="inputGroupSelect01"
                            placeholder="Search the products here ..."
                            value={search}
                            onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
                        />
                    </div>
                </div>
                <div className="col-12 col-sm-6  col-lg-4">
                    <div className="input-group mt-3">
                        <label className="input-group-text" for="inputGroupSelect02">Filters :</label>
                        <select className="form-select" id="inputGroupSelect02"
                            name="category"
                            value={category}
                            onChange={handleCategory}
                        >
                            <option selected>All Products</option>
                            {
                                categories.map(categorie => (
                                    <option value={"category=" + categorie._id}
                                        key={categorie._id}>
                                        {categorie.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-6   col-lg-3 mb-3">
                    <div className="input-group mt-3">
                        <label className="input-group-text" for="inputGroupSelect03">Sort By :</label>
                        <select class="form-select" id="inputGroupSelect03"
                            name="category"
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                        >
                            <option selected>Newest</option>
                            <option value=''>Newest</option>
                            <option value='sort=oldest'>Oldest</option>
                            <option value='sort=-sold'>Best sales</option>
                            <option value='sort=-price'>Price: Hight-Low</option>
                            <option value='sort=price'>Price: Low-Hight</option>
                        </select>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Filters;
