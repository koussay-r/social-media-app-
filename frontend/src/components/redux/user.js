import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Function to get the initial state with the required dynamic logic
const getInitialState = () => {
  const nightDayMode = JSON.parse(localStorage.getItem("mode"));
  const accountExistCookies = localStorage.getItem("account") === null ? false : true;
  const accountExistSession = sessionStorage.getItem("account")=== null ? false : true;
  return {
    auth: false,
    UserData: {},
    LoadingUSerData: false,
    accountExistCookies,
    accountExistSession,
    error:false,
    nightDayMode,
    profileUser:{},
    profileLoading: false,
  };
};
export const fetchLoginData =createAsyncThunk("fetchLoginData",async()=>{
  const accountExistCookies = localStorage.getItem("account") === null ? false : true;
  const accountExistSession = sessionStorage.getItem("account")=== null ? false : true;
  if(accountExistCookies&&!accountExistSession){
    const account=JSON.parse(localStorage.getItem("account"));
    const data = await axios.post("http://localhost:9000/createUser/login",{email:account.email,password:account.password})
    sessionStorage.setItem("account",JSON.stringify(data.data[0]));
    return data.data[0]
  }
  else if(accountExistSession){
  const DataAccount=JSON.parse(sessionStorage.getItem("account"))
  return DataAccount;
}})

export const fetchFindUserById=createAsyncThunk("fetchFindUserById",async(itemId)=>{
  try{
    const res2=await axios.post("http://localhost:9000/Users/findUserById",{_id:itemId})
    console.log(res2.data[0]);
    return res2.data[0]
  }catch(Err){
    console.log(Err.message);
  }
})
export const LoginDataSlice = createSlice({
  name: "loginData",
  initialState: {
    value: getInitialState() // Use a function to get the initial state
  },
  reducers: {
    changeAuth:(state,action)=>{
      state.value.auth=action.payload
    },
    changeUserData:(state,action)=>{
      state.value.UserData=action.payload
    },
    changeLoadingUSerData:(state,action)=>{
      state.value.LoadingUSerData=!state.LoadingUSerData
    },
    changeAccountExistCookies:(state,action)=>{
      state.value.accountExistCookies=!state.accountExistCookies
    },
    changeAccountExistSession:(state,action)=>{
      state.value.accountExistSession=!state.accountExistCookies
    }
    ,
    changeNightDayMode:(state,action)=>{
      state.value.nightDayMode=action.payload
    },
    changeProfileUser:(state,action)=>{
      state.value.profileUser=action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchLoginData.pending,(state,action)=>{
      state.value.LoadingUSerData=true;
    });
    builder.addCase(fetchLoginData.fulfilled,(state,action)=>{
      state.value.LoadingUSerData=false;
      state.value.UserData=action.payload;
      state.value.auth=true
     
    });
    builder.addCase(fetchLoginData.rejected,(state,action)=>{
      state.value.LoadingUSerData=false;
      state.value.error=true
    })
  builder.addCase(fetchFindUserById.fulfilled,(state,action)=>{
    state.value.profileUser=action.payload
    state.value.profileLoading=false
  })
  builder.addCase(fetchFindUserById.pending,(state,action)=>{
    state.value.profileLoading=true
  })
  }
});

export const { changeProfileUser,changeAuth,changeAccountExistSession,changeUserData,changeLoadingUSerData,changeAccountExistCookies,changeNightDayMode } = LoginDataSlice.actions;
export default LoginDataSlice.reducer;
