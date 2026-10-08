Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  post '/auth/register', to: 'users#create'

  resources :events, only: [:index, :show]
  resources :blogs, only: [:index, :show, :create]
  resources :projects, only: [:index, :show]
  resources :project_proposals, only: [:index, :show]
  resources :sigs, only: [:index, :show]

  get 'auth/me', to: 'users#me'
  patch 'auth/change_password', to: 'users#change_password'
end


