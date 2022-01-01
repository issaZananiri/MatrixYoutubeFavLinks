import { userService } from 'services';
import { categoryService } from 'services';
import { favouriteService } from 'services';
import { Link ,Spinner} from 'components';
import { useState, useEffect } from 'react';
import YoutubeEmbed from "../components/YoutubeEmbed";
import { Layout } from 'components/categories';
import { Layout2 } from 'components/favourites' ;
import {  alertService } from 'services';
import fav from 'data/favourites.json';
import{ init } from '@emailjs/browser';
import * as emailjs from "emailjs-com";
import { send } from 'emailjs-com';
import data from 'data/favourites.json';
init("user_CBANdKEdS5mDRsscE2MzW");
export default Home;


function Home() {
    const [categories, setCategories] = useState(null);
    const [favourites, setFavourites] = useState(null);
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(fav)
      )}`;
    const [toSend, setToSend] = useState({
        from_name: 'Issa website',
        to_name: userService.userValue?.firstName,
        message: jsonString,
        reply_to: userService.userValue?.lastName,
      });   
    useEffect(() => {
        categoryService.getAll().then(x => setCategories(x));
     
    }, []);
    useEffect(() => {
        favouriteService.getAll().then(y => setFavourites(y));
     
    }, []);

    const handleChange1 = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
      };
      const onSubmit1 = (e) => {
        e.preventDefault();
        send(
          'service_kuy5j59',
          'template_vqsav8c',
          toSend,
          'user_CBANdKEdS5mDRsscE2MzW'
        )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          })
          .catch((err) => {
            console.log('FAILED...', err);
          });
      };
    function createFavourite(data) {
        return favouriteService.register(data)
            .then(() => {
                alertService.success('favourite added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }



    function deleteCategory(id) {
        setCategories(categories.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        categoryService.delete(id).then(() => {
            setCategories(categories => categories.filter(x => x.id !== id));
        });
    }
    function deleteFavourite(id) {
        setFavourites(favourites.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        favouriteService.delete(id).then(() => {
            setFavourites(favourites => favourites.filter(x => x.id !== id));
        });
    }
    return (
        
        <div className="p-4">
        
                <h1>Hi {userService.userValue?.firstName}!</h1>

  
     

            <Layout>
                
          
            <h1>Categories:</h1>
            <table className="table table-striped">
                
                <thead>
                    <tr>
                    <th style={{ width: '30%' }}>Link</th>
                        <th style={{ width: '30%' }}>Category Name :</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category =>
                        <tr key={category.id}>
            <YoutubeEmbed embedId={youtube_parser(category.linkName)} />
                            <td>{category.categoryname}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                           
                            <button onClick={() =>  createFavourite(category)} className="btn btn-sm btn-secondary btn-add-category" >
                                Add to favourites
                                </button>
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
                </tbody>
            </table>
        </Layout>
        <Layout2>
            <h1>Favourites:   </h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                    <th style={{ width: '30%' }}>Link</th>
                        <th style={{ width: '30%' }}>Category Name :</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {favourites && favourites.map(favourite =>
                        <tr key={favourite.id}>
            <YoutubeEmbed embedId={youtube_parser(favourite.linkName)} />
                            <td>{favourite.categoryname}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                               <button onClick={() => {{'parseURL(this.favourite.Link)'}}} className="btn btn-sm btn-primary " > play </button>
                                <button onClick={() => deleteFavourite(favourite.id)} className="btn btn-sm btn-danger btn-delete-favourite" disabled={favourite.isDeleting}>
                                    {favourite.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete from Favourites</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!favourites &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {favourites && !favourites.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No favourites To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout2>
     
  

<div className='container'>
      <form onSubmit={onSubmit1}>
  <input
    type='text'
    name='from_name'
    hidden
    placeholder='from name'
    value={toSend.from_name}
    onChange={handleChange1}
  />
  <input
    type='text'
    name='to_name'
    placeholder='to name'
    value={toSend.to_name}
    onChange={handleChange1}
  />
  <input
    type='text'
    name='message'
  hidden
    placeholder='Your message'
    value={toSend.message}
    onChange={handleChange1}
  />
  <input
    type='text'
    name='reply_to'
    
    placeholder='Your email'
    value={toSend.reply_to}
    onChange={handleChange1}
  />
        <button type="button" className="btn btn-bg btn-primary btn-add-category" onClick={exportData}>
        Export Data
      </button>
  <button type='submit' className="btn btn-large btn-secondary btn-add-category">Send To Email</button>
</form>
</div>

    

        </div>
        
    );
}


  
const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(fav)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
// Function: opens up volume rocker



