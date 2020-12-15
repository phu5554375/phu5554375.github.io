module.exports = (request, response) => {
    const userId = request.body.applicationId;
    if (userId === 1) {
        return response.status(200).send({});
    }
    
    return response.status(200).send({
        "id": request.body.applicationId,
        "userName": request.body.username,
        
    });
}