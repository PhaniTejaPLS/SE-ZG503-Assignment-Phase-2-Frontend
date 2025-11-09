import { useEffect, useState } from "react"
import { requestService } from "../../services/request.service";
import { useAuth } from "../../Contexts/AuthContext";


export function ApproveRequestComponent(){

    const [requests, setRequests] = useState([]);
    const [requestsDetails, setRequestDetails] = useState([]);
    const { user } = useAuth();

    async function fetchAllRequests(){
            const response = await requestService.getAllRequests();
            setRequests(response.data);
        }

    useEffect(()=>{

        
        fetchAllRequests();
    },[user.id]);

    const changeStatusofRequest = async(requestId,status) =>{
        try{
            const response  = await requestService.approveRequestById(requestId,status);
            fetchAllRequests();
            console.log(response.data)
        }catch(err){
            console.log(err);
        }
    }

    const cancelRequest = async (requestId) => {
            try {
                const response = await requestService.deleteRequestById(requestId);
                fetchAllRequests()
            }catch (err) {
                console.log(err)
            }
        }


    const getRequestDetails = async (requestId) => {
            try {
                const response = await requestService.getRequestDetailsById(requestId);
                console.log(response.data)
                setRequestDetails(response.data);
                fetchAllRequests();
            }catch(err){
                console.log(err)
            }
        }


    // Show empty state if no requests
    if (!requests || requests.length === 0) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="text-center py-5">
                            <div className="mb-4">
                                <i className="bi bi-inbox" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
                            </div>
                            <h2 className="mb-3">No Requests Found</h2>
                            <p className="text-muted mb-4">
                                There are currently no borrow requests to review. 
                                All requests have been processed or no requests have been submitted yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
                        <table className="table table-dark table-hover">
                            <thead>

                                <tr className="table-dark">
                                    <th className="table-dark" scope="col">Request ID</th>
                                    <th className="table-dark" scope="col">Request Date</th>
                                    <th className="table-dark" scope="col">Status</th>
                                    <th className="table-dark" scope="col">Action</th>
                                    <th className="table-dark" scope="col">Details</th>
                                    <th className="table-dark" scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    requests.map((request) => {
                                        return (
                                            <tr className="table-dark" key={request.id}>
                                                <td className="table-dark">{request.id}</td>
                                                <td className="table-dark">{new Date(request.requestDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</td>
                                                <td className="table-dark">{request.status}</td>
                                                <td>
                                                    {
                                                        request.status === 'pending'  ?(
                                                            <button
                                                            className="btn btn-outline-light btn-sm"
                                                            onClick={() => changeStatusofRequest(request.id,'approved')}
                                                        >
                                                            Approve
                                                        </button>
                                                        ):
                                                        new Date(request.requestDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                            className="btn btn-outline-light btn-sm"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#requestDetails"
                                                            onClick={() => getRequestDetails(request.id)}
                                                        >
                                                            View
                                                        </button>
                                                </td>
                                                <td className="table-dark">
                                                    {request.status === 'pending' ? 
                                                        (
                                                            <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => cancelRequest(request.id)}
                                                        >
                                                            Cancel Request
                                                        </button>
                                                        ):
                                                        (<button
                                                            className="btn btn-outline-success btn-sm" disabled
                                                            
                                                        >
                                                            Active
                                                        </button>)

                                                    }
                                                    
                                                </td>
                                                
                                            </tr>


                                        )
                                    })
                                }
                            </tbody>
                        </table>
                
                    <div className="modal fade" id="requestDetails"   tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Request Details</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Equipment Name</th>
                                            <th scope="col">Requested Quantity</th>
                                            <th scope="col">Borrow Date</th>
                                            <th scope="col">Return Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            requestsDetails.map((requestItem)=>{
                                                return (
                                                   <tr>
                                                    <td>{requestItem.equipmentName}</td>
                                                    <td>{requestItem.borrowedQuantity}</td>
                                                    <td>{new Date(requestItem.borrowDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</td>
                                                    <td>{new Date(requestItem.returnDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</td>
                                                   </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>



                </>

            
        

    )

}