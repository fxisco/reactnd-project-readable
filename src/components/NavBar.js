import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ categories = [], selectedCategory }) => {
    return (
        <nav className="categories">
            {categories.map((category, index) => {
                return (
                    <Link key={index} className={`${category.path === selectedCategory ? 'active' : ''}`} to={`/${category.path}`}>{category.name}</Link>
                );
            })}
        </nav>
    );
}

NavBar.PropTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.number
};

export default NavBar;
