import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Autocomplete from "./Autocomplete";
import { Link } from 'components';
import { categoryService, alertService } from 'services';
import { useState, useEffect } from 'react';

export { AddEdit };

function AddEdit(props) {
    const category = props?.category;
    const isAddMode = !category;
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.getAll().then(x => setCategories(x));
    }, []);
    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    // form validation rules 
    const validationSchema = Yup.object().shape({

   
      
            linkName: Yup.string()
            .required('link Name is required'),
            categoryname: Yup.string()
            .required('categoryname is required'),
  
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.category;
    }


    function onSubmit(data) {
        return isAddMode
            ? createCategory(data)
            : updateCategory(category.id, data);
    }

    function createCategory(data) {
        return categoryService.register(data)
            .then(() => {
                alertService.success('Category added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateCategory(id, data) {
        return categoryService.update(id, data)
            .then(() => {
                alertService.success('Category updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
           
   
    

     {/* <Autocomplete suggestions={[categories.map(category1 =>category1.categoryname).toString()]}/>

      */}

                <div className="form-group col">
                    <label>link </label>
                    <input name="linkName" type="text" required {...register('linkName')} className={`form-control ${errors.linkName ? 'is-invalid' : ''}`} />
                    
                    <label>Category Name:</label>
                    <div  type="input" {...register('categoryname')} >
                    <Autocomplete  name="categoryname"   suggestions={[categories.map(category1 =>category1.categoryname).toString()]}/>
                    </div>
                 
                </div>
    
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/categories" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}