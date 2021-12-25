import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

function Home(){
      const [input,setInput]=useState({
            name:'',
            email:'',
            balance:0
      })
      const [order,setOrder]=useState({
            user:0,
            Products:[],
            price:0
      })

      const [users, setUsers] = useState([])
      const [reload,setReload]=useState(true)
      const products = ['Brush','Drill','Glue','Hammer','Screws','Sticky tape','Rope']
      const prices = [7000,5000,2000,10000,1000,15000,3000]
      const [userOrder,setUserOrder] = useState('')
      const [id1,setId1]=useState(0)
      const [id2,setId2]=useState(0)
      const [money,setMoney]=useState(0)
      let productsDispatch = []
      let totalBuy = [2,4]

      useEffect( ()=>{
            const axiosUsers = async ()=>{
                  const allUsers = await axios.get('http://localhost:3000/dev/getAllUsers')
                  setUsers(allUsers.data)
            }
            
            axiosUsers()
            setReload(true)
      },[reload])
      
      function handleChange(e){
            console.log(e.target.name,'<----el target!')
            setInput({...input,[e.target.name]:e.target.value})
            setOrder({[e.target.name]:e.target.value})
      }
      
      async function handleSubmit(e){
            e.preventDefault()
            if(typeof input.balance === 'string'){input.balance=parseInt(input.balance,10)}
            const send = await axios.post('http://localhost:3000/dev/userCreate',input)
            setReload(false)
            
      }
      function selectorProduct(e,total){
            console.log(total,'<--- total')
            if(!productsDispatch.includes(e.target.value)&& e.target.checked){
                  productsDispatch.push(e.target.value)
                  totalBuy.push(total)
                  console.log(productsDispatch,'<---- los productos')
                  console.log(totalBuy,'<------total compra')
            }

      }
      async function createOrder(){
            users.map((e)=>{
                        if (e.id_user=== parseInt(userOrder)){
                              console.log('encontro el usuario')
                       if (e.balance < totalBuy.reduce((a,b)=>a+b,0)){
                             return window.alert('The user does not have funds to complete the transaction ❌')
                       }}
                  })
                  /* console.log(errorFunds(),'el error de funds') */
            try{
                  const order = await axios.post('http://localhost:3000/dev/orderCreate',{
                   users: parseInt(userOrder),
                   Products:productsDispatch,
                   price: totalBuy.reduce((a,b)=>a+b,0)
             })
             console.log(order,'<++++ la orden')
             window.alert('Order Created ✅✅✅')
            setReload(false)
            }catch(e){
                  console.log(e)
            }
             
      }
      async function transferMoney(){
            console.log(typeof money,'<------ Money')
            try{
                  const send = await axios.post('http://localhost:3000/dev/passMoney',{
                        id1:parseInt(id1),
                        money:parseInt(money),
                        id2:parseInt(id2)

                  })
                  setReload(false) 
            }catch(e){
                  console.log(e)
            }

      }
      
      console.log(users,'<----todos los users')
      console.log(userOrder,'<------el usuario de la orden ')
      return(
            <div>
                  <h1>Muncher Test</h1>
                  <h2>Create User</h2>
                  <form onSubmit={(e)=>handleSubmit(e)}>
                  <label>Name &nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input value={input.name} type='text' name='name' onChange={(e)=>handleChange(e)}/>
                  <label>&nbsp;&nbsp;&nbsp;Email &nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input value={input.email} type='text' name='email' onChange={(e)=>handleChange(e)}/>
                  <label>&nbsp;&nbsp;&nbsp;Initial Money &nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input value={input.balance} type='number' name='balance' onChange={(e)=>handleChange(e)}/>
                  <button type="submit">Create User</button>
                  </form>
                  <h2>User's Table</h2>
                              <div>
                                    <table>
                                          <thead>
                                                <tr>
                                                      <th>ID</th>
                                                      <th>Name</th>
                                                      <th>Email</th>
                                                      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Balance</th>
                                                      <th>Order Purchased </th>
                                                </tr>
                                          </thead>
     

                  <tbody>
                                                
                                          
                  {users.length>0 ? users.map((e,i)=>{
                        return(
                              <tr key={i}>
                                    <th>{e.id_user}</th>
                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{e.name}</th>
                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;{e.email}</th>
                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{e.balance}</th>
                                    <th>{e.orders.length > 0 ? e.orders.map((e,i)=>{
                                          return (
                                                <div key={i}>
                                                      {e.Products.length>0 ? e.Products.map((x,i)=>{
                                                            return(<a key={i}>{x}&nbsp;&nbsp;&nbsp;</a>)
                                                      }):null}
                                                      <a>Total----&gt; &nbsp;${e.Price}</a>
                                                
                                                </div>
                                          )
                                    }
                                          
                                    ):null}</th>
                              </tr>
                        )
                  }):null}
                  </tbody>
                   </table>
                   <h1>Create order</h1>
                  <a>Choose a user to create the order ----------&gt; </a>
                  <select  onClick={(e)=>setUserOrder(e.target.value)}>
                   {users.length>0 ? users.map((e,i)=>{     
                         return(
                               <option value={e.id_user}>{e.name}</option>
                         )
                        }):null}
                  </select>
                        {products.map((e,i)=>{
                              return(
                                    <div >
                                          <input type='checkbox' value={e} onClick={(e)=>selectorProduct(e,prices[i])}/>
                                          {e}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${prices[i]}
                                          
                                    </div>
                              )
                        })}

                    <button onClick={()=>createOrder()}>Create Order</button>
                  
                  
                   </div>
                   <h1>Transfer Money</h1>
                   <a>Money Sender 📤</a>
                   <select  onClick={(e)=>setId1(e.target.value)}>
                   {users.length>0 ? users.map((e,i)=>{     
                         return(
                               <option value={e.id_user}>{e.name}</option>
                         )
                        }):null}
                  </select>
                  <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount&nbsp;&nbsp;💵</a>
                  <input type='number' onChange={(e)=>setMoney(e.target.value)}/>
                  <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Money Receiver 📥</a>
                   <select  onClick={(e)=>setId2(e.target.value)}>
                   {users.length>0 ? users.map((e,i)=>{     
                         return(
                               <option value={e.id_user}>{e.name}</option>
                         )
                        }):null}
                  </select>
                  <button onClick={()=>transferMoney()}>Send ⚠️</button>

            </div>
      )
}
export default Home