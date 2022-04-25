import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormCheck,
    CRow,
    CTable,
    CFormInput,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
  } from '@coreui/react'
  import { useForm } from "react-hook-form";
  import { nanoid } from "nanoid";
  import { useState , useEffect } from 'react';
  import CIcon  from '@coreui/icons-react'
  import { cilUserPlus} from '@coreui/icons';
  import axios from 'axios'

import ReadOnlyRow from 'src/components/ReadOnlyRow';
import EditableRow from 'src/components/EditableRow';

/* These are static data just for test  
   Once We connect to the API we delete tableExample 
*/
import tableExample  from '../../utils/users'



const ViewUsers =  () => { 

  /* Get Request  : Loading users */
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    /*TODO: Please change the endpoint accordingly*/ 
    axios.get(`http://localhost:3000/user/getAllUsers`)
        .then((response) => {
            setAPIData(response.data);
        })
}, []) 

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const [users, setUsers] = useState(tableExample);
  const [editFormData , setEditFormData ]= useState({
    nom : "",
    prenom :"",
    matricule : "",
    inactive : ""
  })

  /* 
    Adding New User 
  */
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: nanoid(),
      nom: addFormData.nom,
      prenom: addFormData.prenom,
      matricule: addFormData.matricule,
      inactive: addFormData.inactive,
    };

    const newUsers = [...users, newUser];
    setUsers(newUsers);
    setShowAddForm(false)

  };


  const [editUserId , setEditUserId] = useState(null);
  const [addFormData, setAddFormData] = useState({
     nom :'' ,
     prenom :'',
     matricule : "",
     inactive : ''
  });


  const handleEditClick  = (event , user ) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues =  {
      nom : user.nom ,
      prenom : user.prenom ,
      matricule : user.matricule,
      inactive : user.inactive
    }

    setEditFormData(formValues)
  }

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); 
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const [showAddForm , setShowAddForm] = useState(false);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); 
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const editedUser = {
      id: editUserId,
      nom : editFormData.nom ,
      prenom : editFormData.prenom,
      matricule : editFormData.matricule,
      inactive : editFormData.inactive
    }
    const newUsers = [...users ];
    const index = users.findIndex((user)=> user.id === editUserId );
    newUsers[index] = editedUser;
    setUsers(newUsers);
    setEditUserId(null)
  }

  const handleCancelClick = () =>{
    setEditUserId(null)
  }

  const handleDeleteClick = (contactId) => {
    const newUsers = [...users];

    const index = users.findIndex((contact) => contact.id === contactId);

    newUsers.splice(index, 1);

    setUsers(newUsers);
  };
    return (
        <>
              <CRow>
                <CCol xs>
                  <form onSubmit={handleEditFormSubmit}>  
                    <CCard className="mb-4">
                      <CCardHeader className="d-flex justify-content-between">
                        <h5>Liste Utilisateurs</h5>
                        <CButton color='dark' onClick={()=> setShowAddForm(true)}><CIcon icon={cilUserPlus}/></CButton>
                      </CCardHeader>
                      <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                          <CTableHead color="light">
                            <CTableRow>
                              <CTableHeaderCell>Nom</CTableHeaderCell>
                              <CTableHeaderCell >Prenom</CTableHeaderCell>
                              <CTableHeaderCell>Matricule</CTableHeaderCell>
                              <CTableHeaderCell>Actions</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                              {users.map((user) => (
                                <>
                                {editUserId === user.id ?
                                 <EditableRow 
                                  editFormData={editFormData} 
                                  handleEditFormChange={handleEditFormChange}
                                  handleCancelClick= {handleCancelClick}
                                />
                                  :
                                  <ReadOnlyRow 
                                    user={user}  
                                    handleDeleteClick={handleDeleteClick}
                                    handleEditClick={handleEditClick}
                                  /> 
                                }
                                </>
                              ))}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                          {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                              <CButton color="primary"type='submit' className="me-md-2">
                                  Désactiver 
                              </CButton>
                          </div> */}
                      </CCard>
                  </form>
                </CCol>
              </CRow>
              {showAddForm && <CRow>
                <CCol>
                    <h4>Ajouter un utilisateur</h4>
                    <CForm onSubmit={handleAddFormSubmit}>
                    <CTableRow className='d-flex justify-content-even'>
                      <CTableDataCell>
                        <CFormInput type='text' required name='nom' placeholder='entrer nom' onChange={handleAddFormChange}/>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type='text' required name='prenom' placeholder='entrer prenom' onChange={handleAddFormChange} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type='text' required name='matricule' placeholder='entrer matricule' onChange={handleAddFormChange} />
                      </CTableDataCell>
                      <CTableDataCell>
                        {/* <CFormInput type='checkbox' name='inactive' onChange={handleAddFormChange} /> */}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color='dark'  type='submit'><CIcon icon={cilUserPlus}/></CButton>
                      </CTableDataCell>
                    </CTableRow>
                    </CForm>
                </CCol>
              </CRow>}
            </>
            );    
}

export default ViewUsers; 