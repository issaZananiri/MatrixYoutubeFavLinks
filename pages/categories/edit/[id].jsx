import { useState, useEffect } from 'react';

import { Layout, AddEdit } from 'components/categories';
import { Spinner } from 'components';
import { categoryService, alertService } from 'services';

export default Edit;

function Edit({ id }) {
    const [category, setCategory] = useState(null);

    useEffect(() => {

        categoryService.getById(id)
            .then(x => setCategory(x))
            .catch(alertService.error)

    }, []);

    return (
        <Layout>
            <h1>Edit Category</h1>
            {category ? <AddEdit category={category} /> : <Spinner /> }
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
