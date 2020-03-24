class AuthController < ApplicationController

    skip_before_action :require_login, only: [:login, :auto_login]

    def login
        puts params
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            payload = {user_id: user.id}
            token = encode_token(payload)
            render json: { user: user, jwt: token}, status: :ok
        elsif user == nil
            render json: {message: "Log in failed! User with that email does not exist."}, status: :not_acceptable
        else (user.password != params[:password])
            render json: {message: "Log in failed! Password is invalid."}, status: :not_acceptable
        end
    end

    def auto_login
        if session_user
            render json: session_user
        else
            render json: {errors: "No user logged in"}
        end
    end

    def user_is_authed
        render json: {message: "You are authorized"}
    end


end
