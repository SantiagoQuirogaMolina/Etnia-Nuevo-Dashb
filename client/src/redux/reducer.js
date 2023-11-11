/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  GET_ALL_PRODUCTS,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  CREATE_PRODUCT,
  CREATE_USER,
  DELETE_PRODUCT,
  GET_ALL_USERS,
  GET_USERS_BY_NAME,
  UPDATE_USER,
  GET_BY_ID,
  GET_PRODUCTS_BY_NAME,
  CLEAR_ERRORS,
  ERRORS,
  FILTROS_AND_PAGINATION,
  USER_LOGIN,
  USER_LOGOUT,
  GET_ALL_SELECTS,
  LOCALSTORAGE,
  ADD_TO_CART,
  REMOVE_SHIPPING,
  UPDATE_SHIPPING,
  ADD_SHIPPING,
  REGISTER_USER,
  UPDATE_PRODUCT,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  DELETE_USER,
  FINISH_PURCHASE,
  GET_ALL_FAVS,
  NEW_CART,
  NEW_FAVORITE,
  REMOVE_CART_BACK,
  REMOVE_FAV_BACK,
  GET_ALL_PURCHASES,
  GET_PURCHASE_DETAIL,
  PERSIST_USER,
} from "./actions";

const initialState = {
  allProducts: [],
  purchase:{},
  createdPurchase:{},
  userPurchases:[],
  productDetail: [],
  purchases: [],
  productShow: [],
  indexProductShow: [],
  allUsers: [],
  FavoritesPersist: [],
  cartPersist: [],
  allFavoritesBack:[],
  allCartBack:[],
  errors: {},
  selectFilter: {},
  page: null,
  localstorage: [],
  user: null,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {



    case FINISH_PURCHASE:
      return {
        ...state,
        errors: {},
      };


    case GET_ALL_FAVS:
      return{
        ...state,
        allFavoritesBack: action.payload
      }
      case GET_ALL_PURCHASES: {
        return {
            ...state,
            purchasesAdmin: action.payload
        }
    }

    
          case GET_PURCHASE_DETAIL:
              return {
                  ...state,
                  purchase: action.payload,
              }     
              
    
    case NEW_FAVORITE:
      return{
        ...state,
        allFavoritesBack: action.payload
      }
    
    case REMOVE_FAV_BACK:
      return{
        ...state,
        allFavoritesBack: action.payload
      }
    
    // case GET_ALL_CARTS:
    //   return{
    //     ...state,
    //     allCartBack: action.payload
    //   }
    
    case NEW_CART:
      return{
        ...state,
        allCartBack: action.payload
      }
    
    case REMOVE_CART_BACK:
      return{
        ...state,
        allCartBack: action.payload
      }
    

    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartPersist: [...state.cartPersist, action.payload],
      };

      case REMOVE_FROM_CART:
        const productIdToRemove = action.payload;
        return {
          ...state,
          cartPersist: state.cartPersist.filter((item) => item.id !== productIdToRemove),
        };
  
      case UPDATE_CART_ITEM_QUANTITY:
        const { productId, newQuantity } = action.payload;
        return {
          ...state,
          cartPersist: state.cartPersist.map((item) =>
            item.id === productId ? { ...item, cantidad: newQuantity } : item
          ),
        };

    case LOCALSTORAGE:
      return {
        ...state,
        localstorage: [action.payload],
      };
   

    case GET_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        productShow: action.payload,
      };
      case UPDATE_PRODUCT:
        return action.payload;

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case GET_USERS_BY_NAME:
      return {
        ...state,
        allUsers: action.payload,
      };

    case CREATE_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };
    case UPDATE_USER:
      return action.payload;

    case DELETE_PRODUCT:
      return action.payload;
    case DELETE_USER:
      return action.payload;

    case ADD_FAVORITES:
      return {
        ...state,
        FavoritesPersist: [...state.FavoritesPersist, action.payload],
      };

    case REMOVE_FAVORITES:
      // eslint-disable-next-line no-case-declarations
      let productRemove = state.FavoritesPersist.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        FavoritesPersist: productRemove,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        errors: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case ERRORS:
      // eslint-disable-next-line no-case-declarations
      const objError = action.payload;
      return {
        ...state,
        errors: { ...state.errors, [objError.type]: objError.error },
      };

    case FILTROS_AND_PAGINATION:
      return {
        ...state,
        indexProductShow: action.payload,
      };

    case GET_ALL_SELECTS:
      return {
        ...state,
        selectFilter: action.payload,
      };

    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      };

    // case FINISH_PURCHASE:
    //   return {
    //     ...state,
    //     errors: {},
    //   };

    
    case PERSIST_USER:
      return {
        ...state,
        user: action.payload
      }


    default:
      return { ...state };
  }
};

export default reducer;
