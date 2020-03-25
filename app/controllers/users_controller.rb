class UsersController < ApplicationController
    skip_before_action :require_login, only: [:create]


    def create
        user = User.create(user_params)
        if user.valid?
            payload = {user_id: user.id}
            token = encode_token(payload)
            render json: {user: user, jwt: token, message: 'success'}, status: :ok
        else 
            render json: {message: user.errors.full_messages[0]}, status: :not_acceptable
        end
    end

    private

    def user_params
        params.permit(:email, :password, :first_name, :last_name, :address, :city, :state, :zip)
    end
end
