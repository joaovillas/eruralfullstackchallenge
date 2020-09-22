class RoomsController < ApplicationController
  def show
    uri = params[:uri]
    room = Room.where(uri: uri).first() 
    response = room == "null" ? false : room
    
    if (!response) 
      return render :status => 404, json: { "error": "room not found" } 
    end

    return render json: response
  end

  def create
    body = JSON.parse(request.body.string)

    is_invalid = !Room.create(body).valid?
    
    if (is_invalid)
      return render json: Room.create(body).errors.messages
    end
    
    return render json: {'status': 'ok'}

  end

end
