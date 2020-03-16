Rails.application.routes.draw do
  resources :users
  resources :dogs
  resources :dog_parks
  resources :check_ins
  resources :reviews
end
