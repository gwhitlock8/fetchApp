class CheckInsController < ApplicationController

    def index
        checkins = CheckIn.all
        render json: {checkins: checkins}, status: :ok
    end

    def create
        checkin = CheckIn.create(checkin_params)
        render json: {checkin: checkin}, status: :ok
    end

    def update
        checkin = CheckIn.find_by(dog_park_id: params[:dog_park_id], dog_id: params[:dog_id])
    end

    def destroy
        checkin = CheckIn.find(params[:id])
        checkin.destroy
    end



    private
    def checkin_params
        params.permit(:dog_park_id, :dog_id, :checkout_time)
    end
end
