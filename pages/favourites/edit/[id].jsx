import { useState, useEffect } from 'react';

import { Layout2, AddEdit } from 'components/favourites';
import { Spinner } from 'components';
import { favouriteService, alertService } from 'services';

export default Edit;

function Edit({ id }) {
    const [favourite, setFavourite] = useState(null);

    useEffect(() => {
        // fetch favourite and set default form values if in edit mode
        favouriteService.getById(id)
            .then(x => setFavourite(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout2>
            <h1>Edit Favourite</h1>
            {favourite ? <AddEdit favourite={favourite} /> : <Spinner /> }
        </Layout2>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
