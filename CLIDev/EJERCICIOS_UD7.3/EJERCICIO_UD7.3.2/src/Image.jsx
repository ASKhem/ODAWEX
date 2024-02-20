import PropTypes from 'prop-types';

function Image({url, idtf, cl, onClick}) {
    return (
        <img src={url} id={idtf} className={cl} onClick={onClick} alt="flecha" />
    );
}

Image.propTypes = {
    url: PropTypes.string.isRequired,
    idtf: PropTypes.string.isRequired,
    cl: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Image;