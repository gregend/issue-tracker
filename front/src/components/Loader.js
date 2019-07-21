import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ status }) => {
    switch (status) {
        case 'NOT_PENDING':
            return <div>:)</div>
        case 'PENDING':
            return <div>Loading...</div>
        case 'SUCCESS':
            return <div>Loaded</div>
    }
};
const { string } = PropTypes;
Loader.propTypes = {
    status: string
};
export default Loader;