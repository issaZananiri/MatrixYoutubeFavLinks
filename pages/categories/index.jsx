import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/categories';
import { categoryService } from 'services';

export default Index;

function Index() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        categoryService.getAll().then(x => setCategories(x));
    }, []);

    function deleteCategory(id) {
        setCategories(categories.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        categoryService.delete(id).then(() => {
            setCategories(categories => categories.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>categories</h1>
          
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th style={{ width: '30%' }}>Link</th>
                        <th style={{ width: '30%' }}>categoryname</th>
                     
                        <th style={{ width: '20%' }}></th>
                    </tr>
                </thead>
                <tbody>
         
                    {categories && categories.map(category =>
                        <tr key={category.id}>
  
               
                            <td>{category.linkName}</td>
                            <td>{category.categoryname}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/categories/edit/${category.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger btn-delete-category" disabled={category.isDeleting}>
                                    {category.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                        
                    )}
                    {!categories &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {categories && !categories.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No categories To Display</div>
                            </td>
                        </tr>
                    }
                           <Link href="/categories/add" className="btn btn-sm btn-success mb-2">Add Category</Link>
                </tbody>
            </table>
        </Layout>
    );
}
