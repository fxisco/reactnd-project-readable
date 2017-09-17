import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ categories = [], onCategoryClick, selectedCategoryIndex }) => {
    return (
        <nav className="categories">
            {categories.map((category, index) => {
                return (
                    <a key={index} className={`${selectedCategoryIndex === index ? 'active' : ''}`} href={`/${category.name}`} onClick={(event) => onCategoryClick(event, index)}>{category.name}</a>
                );
            })}
        </nav>
    );
}

NavBar.PropTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategoryIndex: PropTypes.number
};

export default NavBar;
