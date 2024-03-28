//This will contain the list in the asynch storage
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profile = ({loadProfile, createProfile, removeProfile}) = {
    // the user profile will be loaded in the storage along with a locally generated uid
    //The first profile will be gotten from the online mongodb database
    //The profile will be assigned a role called Admin
    // Every other profile will be assigned a role called User
}
