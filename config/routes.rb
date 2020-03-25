Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :dogs, only: [:create, :index]
  resources :dog_parks
  resources :check_ins
  resources :reviews

  get 'dog_parks/:id/check_ins', to: 'dog_parks#check_ins'
  get 'dog_parks/:id/reviews', to: 'dog_parks#reviews'

  post 'login', to: 'auth#login'
  get 'auto_login', to: "auth#auto_login"
  get 'user_is_authed', to: 'auth#user_is_authed'

  
end
