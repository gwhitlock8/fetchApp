class UsersController < ApplicationController

    skip_before_action :require_login, only: [:create]


    def create
        begin
            user = User.create(user_params)
            payload = {user_id: user.id}
            token = encode_token(payload)
            render json: {user: user, jwt: token, message: success}, status: :ok
            puts 'SAAAAVVVVVVE'
        rescue => exception
            puts 'ERRRRRROOOOOORR'
            render json: {code: 500, message: 'User with that email already exists'}, status: :not_acceptable
        end
    end

    private

    def user_params
        params.permit(:email, :password, :first_name, :last_name, :address, :city, :state, :zip)
    end
end
