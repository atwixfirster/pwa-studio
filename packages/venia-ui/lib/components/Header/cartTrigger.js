import React, { useEffect, useMemo } from 'react';
import { connect } from '@magento/venia-drivers';
import { func, number, object, shape, string } from 'prop-types';
import { ShoppingCart as ShoppingCartIcon } from 'react-feather';

import { getCartDetails, toggleCart } from '../../actions/cart';
import Icon from '../Icon';
import CartCounter from './cartCounter';

import { mergeClasses } from '../../classify';
import defaultClasses from './cartTrigger.css';

const getCartIcon = cartDetails => {
    const itemsQty = cartDetails.items_qty;
    const iconColor = 'rgb(var(--venia-text))';
    const svgAttributes = {
        stroke: iconColor
    };

    if (itemsQty > 0) {
        svgAttributes.fill = iconColor;
    }

    return <Icon src={ShoppingCartIcon} attrs={svgAttributes} />;
};

const Trigger = props => {
    const { cart, getCartDetails, toggleCart } = props;
    const { details: cartDetails } = cart;
    const { items_qty: numItems } = cartDetails;

    const classes = mergeClasses(defaultClasses, props.classes);

    useEffect(() => {
        if (getCartDetails) {
            getCartDetails();
        }
    }, [getCartDetails]);

    const cartIcon = useMemo(() => {
        return getCartIcon(cartDetails);
    }, [cartDetails]);

    return (
        <button
            className={classes.root}
            aria-label="Toggle mini cart"
            onClick={toggleCart}
        >
            {cartIcon}
            <CartCounter counter={numItems} />
        </button>
    );
};

Trigger.propTypes = {
    cart: shape({
        details: shape({
            items_qty: number
        }).isRequired
    }).isRequired,
    classes: shape({
        root: string
    }),
    getCartDetails: func,
    toggleCart: func
};

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = {
    getCartDetails,
    toggleCart
};

const ConnectedTrigger = connect(
    mapStateToProps,
    mapDispatchToProps
)(Trigger);

export default ConnectedTrigger;
