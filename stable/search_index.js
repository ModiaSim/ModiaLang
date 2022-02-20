var documenterSearchIndex = {"docs":
[{"location":"index.html#ModiaLang-Documentation","page":"Home","title":"ModiaLang Documentation","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"ModiaLang is an environment in form of a Julia package to model and simulate physical systems (electrical, mechanical, thermo-dynamical, etc.) described by differential and algebraic equations. A user defines a model on a high level with model components (like a mechanical body, an electrical resistance, or a pipe) that are physically connected together. A model component is constructed by \"expression = expression\" equations. The defined model is symbolically processed (for example, equations might be analytically differentiated) with algorithms from package ModiaBase.jl. From the transformed model a Julia function is generated that is used to simulate the model with integrators from DifferentialEquations.jl. The basic type of the floating point variables is usually Float64, but can be set to any type FloatType<:AbstractFloat via @instantiateModel(..., FloatType = xxx), for example it can be set to Float32, DoubleFloat, Measurement{Float64}, StaticParticles{Float64,100}.","category":"page"},{"location":"index.html#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"ModiaLang is included in Modia and is available, when Modia was installed.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"A standalone ModiaLang version is installed with:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"julia> ]add ModiaLang","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Furthermore, one or more of the following packages should be installed in order  to be able to generate plots:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"julia> ]add ModiaPlot_PyPlot        # if plotting with PyPlot desired\r\n        add ModiaPlot_GLMakie       # if plotting with GLMakie desired\r\n        add ModiaPlot_WGLMakie      # if plotting with WGLMakie desired\r\n        add ModiaPlot_CairoMakie    # if plotting with CairoMakie desired","category":"page"},{"location":"index.html#Release-Notes","page":"Home","title":"Release Notes","text":"","category":"section"},{"location":"index.html#Version-0.11.0","page":"Home","title":"Version 0.11.0","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Non-backwards compatible changes","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Equations can only be defined with key equations and no other key. ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Parameter values in the code are now type cast to the type of the parameter value from the  @instantiatedModel(..) call. The benefit is that access of parameter values in the code is type stable and operations with the parameter value are more efficient and at run-time no memory is allocated. Existing models can no longer be simulated, if parameter values provided via simulate!(.., merge=xx) are not type compatible to their definition. For example, an error is thrown if the @instantedModel(..) uses a Float64 value and the simulate!(.., merge=xx) uses a Measurement{Float64} value for the same parameter","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Other changes","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Hierarchical names in function calls supported (e.g. a.b.c.fc(..)). ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Functions can return multiple values, e.g. (tau1,tau2) = generalizedForces(derw1, derw2).","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Support for StaticArrays variables (the StaticArrays feature is kept in the generated AST). For an example, see ModiaLang/test/TestArrays.jl.\nSupport for Array variables (especially of state and tearing variables) where the dimension can change after @instantiateModel(..). For examples, see ModiaLang/test/TestArrays.jl and TestMultiReturningFunction10.jl.\nNew keyword Var(hideResult=true) removes variable from the result (has no effect on states, derivative of states and parameters). For an example, see ModiaLang/test/TestMultiReturningFunction10.jl","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"New feature of @instantiatedModel(..): If a Model(..) has key :_buildFunction, call this function to merge additional code to the model. For details see the docu of function buildSubModels! in ModiaLang.jl. For examples, see ModiaLang/test/TestMultiReturningFunction10.jl and  constructor Model3D(..) in Modia3D/src/ModiaInterface/model3D.jl and Modia3D/src/ModiaInterface/buildModia3D.jl.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Generalized connection semantics.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Functions converting model to/from JSON: modelToJSON(model), JSONtoModel(json_string)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"simulate!(..):\nNew option logProgress=false in function simulate!(..) to print current simulation time every 5s (cpu-time).\nIf tolerance is too small, a warning is prented and it is automatically enlarged to a meaningful value (e.g. tolerance = 1e-8 is not useful if FloatType=Float32)\nLogging improved: If log=true or logTiming=true, then timing, memory allocation and compilation time is  reported for initialization (ths includes compilation of the generated getDerivatives(..) function).  The remaining log shows cpu-time and memory allocation without initialization  (and without the resources needed to compile getDerivatives(..)).\nPrefix messages of the timers with \"ModiaLang\" or \"DifferentialEquations\" to more clearly see the origin of a message in the timer log.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Large speedup of symbolic transformation, if function depends on many input (and output) arguments  (includes new operator implicitDependency(..)).","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Included DAE-Mode in solution of linear equation system (if DAE integrator is used and all unknowns of a linear equation system are part of the DAE states, solve the linear equation system during continuous integration via DAE solver (= usually large simulation speed-up, for larger linear equation systems)  ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Bug fixes","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"If unitless=true, units in instantiatedModel.evaluatedParameters are removed.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The unit macro is kept in the generated code and is no longer expanded. For example, u\"N\", is kept in the code that is displayed with logCode=true (previously, this was expanded and the unit was displayed in the code as N which is not correct Julia code).\nFunction ModiaLang.firstInitialOfAllSegments(..) now correctly returns true for the first call of the getDerivatives function during the simulation.","category":"page"},{"location":"index.html#Version-0.10.0","page":"Home","title":"Version 0.10.0","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Require DifferentialEquations.jl version 7.\nCleanup of using/export\nCleanup of Project.toml/Manifest.toml.´\n@reexport using Unitful\n@reexport using DifferentialEquations\nCleanup of test files (besides ModiaLang, no other package needed in the environment to run the tests).\nChange SimulationModel{FloatType,ParType,EvaluatedParType,TimeType} to SimulationModel{FloatType,TimeType}","category":"page"},{"location":"index.html#Version-0.9.1","page":"Home","title":"Version 0.9.1","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"New function plotPath to plot a PTP_path\nReplace ustrip(..) with ustrip.(..) at some places to get rid of warnings.\nInclude time in error message, if simulation failed","category":"page"},{"location":"index.html#Version-0.9.0","page":"Home","title":"Version 0.9.0","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Require Julia 1.7\nUpgrade Manifest.toml to version 2.0\nUpdate Project.toml/Manifest.toml","category":"page"},{"location":"index.html#Version-0.8.7","page":"Home","title":"Version 0.8.7","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Packages used in test models, prefixed with ModiaLang. to avoid missing package errors.\nDeactivating test with DoubleFloats, since not in Project.toml\nVersion/date updated","category":"page"},{"location":"index.html#Version-0.8.6","page":"Home","title":"Version 0.8.6","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Require ModiaResult, version 0.3.9\nProject.toml/Manifest.toml updated","category":"page"},{"location":"index.html#Version-0.8.5","page":"Home","title":"Version 0.8.5","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"simulate!(..): \nTrigger an error, if simulation is not successful (retcode is neither :Default nor :Success nor :Terminate)\nUse RightRootFind for zero crossings (improves state events based on new DifferentialEquations option)\nNew keyword argument requiredFinalStates_atol=0.0.\nImprove docu (e.g. add return argument solution).  \nShow correct integrator name QBDF in simulation log (instead of QNDF)\nRaise an error, if (relative) tolerance is too small for FloatType\nUse FloatType for zero crossing hysteresis, instead of Float64\nIf log=true print info about end of initialization.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Support of MonteCarloMeasurements with units + new test model TestLinearEquationSystemWithUnitsAndMonteCarlo.jl","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Fixing and activating the deactivated test TestTwoInertiasAndIdealGearWithUnitsAndMonteCarlo.jl.","category":"page"},{"location":"index.html#Version-0.8.4","page":"Home","title":"Version 0.8.4","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"FloatType is included in the name space of Core.eval when evaluating parameters.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Version and Date updated","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Included Version in printout of runtests.jl and runtests_withPlot.jl","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Print difference of finalStates and requiredFinalStates in case they do not match with the given tolerance.","category":"page"},{"location":"index.html#Version-0.8.3","page":"Home","title":"Version 0.8.3","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Project.toml, Manifest.toml updated: Require newest version 0.7.7 of ModiaBase (containing a bug fix)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Minor correction of simulate!(log=true) output","category":"page"},{"location":"index.html#Version-0.8.2","page":"Home","title":"Version 0.8.2","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Issue with tearing fixed: Variables are only explicitly solved, if linear factor is a non-zero literal number (previously a division by zero could occur, if the linear factor became zero during simulation).","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Issue with unit of tearing variable fixed, if it is a derivative of a variable (previously, the generated code for unitless=false was wrong, if the tearing variable was  a derivative, since the unit was not taken into account).","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"simulate!(..): \nSupport DAE integrators, especially IDA() from Sundials.\nNew keyword useRecursiveFactorizationUptoSize=0: Linear equation systems A*v=b are solved with RecursiveFactorization.jl instead of  the default lu!(..) and ldiv!(..), if length(v) <= useRecursiveFactorizationUptoSize. According to RecursiveFactorization.jl docu, it is faster as lu!(..) with OpenBLAS, for length(v) <= 500 (typically, more as a factor of two).  Since there had been some cases where lu!(..)! was successful, but RecursiveFactorization.jl failed due to a singular system, the default is to use lu!(..)!.\nIf log=true, sizes of linear equation systems are listed, as well as whether  RecursiveFactorization.jl is used for the respective system.\nTest for RecursiveFactorization.jl added in TestTwoInertiasAndIdealGear.jl","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Some test models corrected (since leading to errors with the above changes).","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Updated Project.toml and Manifest.toml with newest versions of packages (including MonteCarloMeasurements, version >= 1) and improved Project.toml file to reduce issues with package constraints","category":"page"},{"location":"index.html#Version-0.8.1","page":"Home","title":"Version 0.8.1","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Added a minimal documentation, including release notes.\nNo message anymore, when ModiaLang is started.\nFixed bug that using ModiaResult is needed, when calling @usingModiaPlot.","category":"page"},{"location":"index.html#Version-0.8.0","page":"Home","title":"Version 0.8.0","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Improved scalability by using OrderedDicts instead of named tuples for models, variables and parameter modifications.\nSpeed improvements for structural and symbolic algorithms.\nAdded support for state events, time events and synchronous operators.\nAdded support for mixed linear equation systems having Real and Boolean unknowns.\nAdded support for user-defined components defined by structs and functions (multibody modeling with Modia3D is based on this feature). This makes it possible to utilize algorithms specialized for a component.\nAdded support for numerical and analytic linearization.\nAdded support for propagation of parameters (e.g. deep in a model, the value of a parameter can be defined as a function of some top level parameter and this parameter is changed before simulation starts).\nNew small model libraries Translational.jl and PathPlanning.jl added.\nResult storage changed: sol = simulate!(...) calls internally sol = solve(..) from   DifferentialEquations.jl. sol contains time and the states at the communication time grid and at events. This is now kept in simulate(..), so the return value of simulate!(..) can be exactly used as if solve(..) would have been used directly.\nThe plot(..) command now supports the following underlying plot packages:  PyPlot, GLMakie, WGLMakie, and CairoMakie. It is also possible to select NoPlot, to ignore plot(..) calls  or SilenNoPlot to ignore plot(..) calls silently. The latter is useful for runtests.jl. Note, often PyPlot is the best choice.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Changes that are not backwards compatible to version 0.7.x:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Models are OrderedDicts and no longer NamedTuples.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"simulate!(..): \nIf FloatType=Float64 and no algorithm is defined, then Sundials.CVODE_BDF() is used instead of the default algorithm of DifferentialEquations as in 0.7. The reason is that Modia models are usually large and expensive to evaluate and have often stiff parts, so that multi-step methods are often by far the best choice. CVODE_BDF() seems to be a good choice in many applications (another algorithm should be used, if there are many events, highly oscillatory vibrations, or if all states are non-stiff). \nThe default value of stopTime is equal to startTime (which has a default value of 0.0 s), and is no longer 1.0 s.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Plotting is defined slightly differently (@useModiaPlot, instead of using ModiaPlot).","category":"page"},{"location":"index.html#Version-0.7.3","page":"Home","title":"Version 0.7.3","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Evaluation and propagation of parameter expressions (also in simulate!(..., merge=Map(...))). Propagation of start/init values of states is not yet supported.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"State events supported.","category":"page"},{"location":"index.html#Version-0.7.2","page":"Home","title":"Version 0.7.2","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Missing dependency of Test package added.","category":"page"},{"location":"index.html#Version-0.7.1","page":"Home","title":"Version 0.7.1","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Variable constructor Var(...) introduced. For example: v = input | Var(init = 1.2u\"m\"). ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Functions are called in the scope where macro @instantiateModel is called.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"New arguments of function simulate!:\nParameter and init/start values can be changed with argument merge.\nA simulation can be checked with argument requiredFinalStates.\nArgument logParameters lists the parameter and init/start values used for the simulation.\nArgument logStates lists the states, init, and nominal values used for the simulation.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"end in array ranges is supported, for example v[2:end].","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"New (small) model library Modia/models/HeatTransfer.jl.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Modia Tutorial improved.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Functions docu improved.","category":"page"},{"location":"index.html#Version-0.7.0","page":"Home","title":"Version 0.7.0","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Initial version, based on code developed for Modia 0.6 and ModiaMath 0.6.","category":"page"},{"location":"index.html#Main-developers","page":"Home","title":"Main developers","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Hilding Elmqvist, Mogram.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Martin Otter, DLR - Institute of System Dynamics and Control.","category":"page"}]
}
